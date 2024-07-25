// src/services/eventService.ts
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();
const ADMIN_EMAIL = 'charitynyawirairungu@gmail.com';

interface CreateEventInput {
  title: string;
  image: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  peoplePerTicket?: number;
  ticketTypes?: string;
  no_tickets: number;
  pricing?: number;
  groupPrice?: number;
  managerId: string;
}

interface UpdateEventInput {
  title?: string;
  image?: string;
  description?: string;
  date?: Date;
  time?: string;
  location?: string;
  ticketTypes?: string;
  peoplePerTicket?: number;
  no_tickets?: number;
  pricing?: number;
  groupPrice?: number;
  managerId?: string;
}

export class EventService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async createEvent(data: CreateEventInput) {
    const managerExists = await prisma.user.findUnique({
      where: { id: data.managerId },
    });

    if (!managerExists) {
      throw new Error('Manager with the provided ID does not exist');
    }

    const event = await prisma.event.create({
      data: {
        ...data,
        date: new Date(data.date),
        status: 'pending',
      },
    });

    const adminApprovalLink = `http://localhost:3000/event/approve/${event.id}`;
    const adminDisapprovalLink = `http://localhost:3000/event/disapprove/${event.id}`;

    const mailOptions = {
      from: `"Event Manager" <${process.env.EMAIL_USER}>`,
      to: ADMIN_EMAIL,
      subject: 'New Event Pending Approval',
      text: `A new event titled "${data.title}" has been created by manager. Please approve or disapprove the event.
            \n\nEvent Details:
            \nTitle: ${data.title}
            \nDescription: ${data.description}
            \nDate: ${data.date}
            \nTime: ${data.time}
            \nLocation: ${data.location}
            \n\nApprove: ${adminApprovalLink}
            \nDisapprove: ${adminDisapprovalLink}`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Approval email sent to admin');
    } catch (error) {
      console.error('Error sending approval email:', error);
    }

    return event;
  }

  async approveEvent(id: string) {
    const event = await prisma.event.update({
      where: { id },
      data: { status: 'approved' },
    });
    return event;
  }

  async disapproveEvent(id: string) {
    const event = await prisma.event.update({
      where: { id },
      data: { status: 'rejected' },
    });
    return event;
  }

  async getEventById(id: string) {
    const event = await prisma.event.findUnique({
      where: { id },
    });
    if (!event) {
      throw new Error('Event not found');
    }
    return event;
  }

  async updateEvent(id: string, data: UpdateEventInput) {
    if (data.managerId) {
      const managerExists = await prisma.user.findUnique({
        where: { id: data.managerId },
      });

      if (!managerExists) {
        throw new Error('Manager with the provided ID does not exist');
      }
    }

    const event = await prisma.event.update({
      where: { id },
      data,
    });
    return event;
  }

  async deleteEvent(id: string) {
    const event = await prisma.event.delete({
      where: { id },
    });
    return event;
  }

  async getAllEvents() {
    const events = await prisma.event.findMany();
    return events;
  }

  async getAllAttendees() {
    const attendees = await prisma.user.findMany({
      where: { role: 'attendee' },
    });
    return attendees;
  }

  async getAllManagers() {
    const managers = await prisma.user.findMany({
      where: { role: 'manager' },
    });
    return managers;
  }

  async getApprovedEvents(managerId: string) {
    const events = await prisma.event.findMany({
      where: { managerId, status: 'approved' },
    });
    return events;
  }

  async getPendingEvents(managerId: string) {
    const events = await prisma.event.findMany({
      where: { managerId, status: 'pending' },
    });
    return events;
  }

  async getDisapprovedEvents(managerId: string) {
    const events = await prisma.event.findMany({
      where: { managerId, status: 'rejected' },
    });
    return events;
  }

  async bookTicket(userId: string, eventId: string, ticketType: string, howmany: number) {
    const event = await prisma.event.findUnique({ where: { id: eventId } });

    if (!event) {
      throw new Error('Event not found');
    }

    const bookedTickets = await prisma.booking.aggregate({
      _sum: {
        howmany: true,
      },
      where: {
        eventId: eventId,
      },
    });

    const totalBookedTickets = bookedTickets._sum.howmany ?? 0;

    if (totalBookedTickets + howmany > event.no_tickets) {
      throw new Error('Tickets are sold out');
    }

    const booking = await prisma.booking.create({
      data: {
        userId,
        eventId,
        ticketType,
        howmany,
        bookingDate: new Date(),
        statu: 'Pending', 
      },
    });

    try {
      await this.transporter.sendMail({
        from: `"Plana Support" <${process.env.EMAIL_USER}>`,
        to: (await prisma.user.findUnique({ where: { id: userId } }))!.email,
        subject: 'Booking Confirmation',
        text: `Your booking is confirmed. Details: 
          Ticket Type: ${ticketType}
          Quantity: ${howmany}
          Booking Date: ${booking.bookingDate}`,
      });
      console.log('Booking confirmation email sent');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error sending email:', error.message);
        console.error('Error details:', (error as any).response);
      } else {
        console.error('Unexpected error sending email:', error);
      }
    }

    return { message: 'Booking was successful!' };
  }

  async calculateRevenue(managerId: string) {
    const events = await prisma.event.findMany({
      where: { managerId, status: 'approved' },
    });
  
    let totalRevenue = 0;
  
    for (const event of events) {
      const bookings = await prisma.booking.findMany({
        where: { eventId: event.id },
      });
  
      for (const booking of bookings) {
        if (booking.ticketType === 'group' && event.groupPrice !== null) {
          totalRevenue += booking.howmany * event.groupPrice;
        } else if (event.pricing !== null) {
          totalRevenue += booking.howmany * event.pricing;
        }
      }
    }
  
    return { managerId, totalRevenue };
  }
  
}
