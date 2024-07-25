// src/controllers/eventController.ts

import { Request, Response } from 'express';
import { EventService } from '../services/event.service';

const eventService = new EventService();

export class EventController {
  async createEvent(req: Request, res: Response) {
    try {
      console.log(req.body);
      const event = await eventService.createEvent(req.body);
      res.status(201).json(event);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error(`Error creating event: ${message}`); // Optional logging
      res.status(400).json({ error: message });
    }
  }

  async getEventById(req: Request, res: Response) {
    try {
      const event = await eventService.getEventById(req.params.id);
      res.status(200).json(event);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error(`Error fetching event by ID: ${message}`); // Optional logging
      res.status(404).json({ error: message });
    }
  }

  async updateEvent(req: Request, res: Response) {
    try {
      const event = await eventService.updateEvent(req.params.id, req.body);
      res.status(200).json(event);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error(`Error updating event: ${message}`); // Optional logging
      res.status(400).json({ error: message });
    }
  }

      async deleteEvent(req: Request, res: Response) {
        try {
          await eventService.deleteEvent(req.params.id);
          res.status(200).json({ message: 'Event deleted successfully' });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unknown error occurred';
          console.error(`Error deleting event: ${message}`); // Optional logging
          res.status(404).json({ error: message });
        }
      }
    
      async getAllEvents(req: Request, res: Response) {
        try {
          const events = await eventService.getAllEvents();
          res.status(200).json(events);
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unknown error occurred';
          console.error(`Error fetching all events: ${message}`); // Optional logging
          res.status(400).json({ error: message });
        }
      }
    
      async getAllAttendees(req: Request, res: Response) {
        try {
          const attendees = await eventService.getAllAttendees();
          res.status(200).json(attendees);
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unknown error occurred';
          console.error(`Error fetching all attendees: ${message}`); // Optional logging
          res.status(400).json({ error: message });
        }
      }
    
      async getAllManagers(req: Request, res: Response) {
        try {
          const managers = await eventService.getAllManagers();
          res.status(200).json(managers);
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unknown error occurred';
          console.error(`Error fetching all managers: ${message}`); // Optional logging
          res.status(400).json({ error: message });
        }
      }
    
      async approveEvent(req: Request, res: Response) {
        try {
          const event = await eventService.approveEvent(req.params.id);
          res.status(200).json({ message: 'Event approved successfully', event });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unknown error occurred';
          console.error(`Error approving event: ${message}`); // Optional logging
          res.status(400).json({ error: message });
        }
      }
    
      async disapproveEvent(req: Request, res: Response) {
        try {
          const event = await eventService.disapproveEvent(req.params.id);
          res.status(200).json({ message: 'Event disapproved successfully', event });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unknown error occurred';
          console.error(`Error disapproving event: ${message}`); // Optional logging
          res.status(400).json({ error: message });
        }
      }
    
      async getApprovedEvents(req: Request, res: Response) {
        try {
          const events = await eventService.getApprovedEvents(req.params.managerId);
          res.status(200).json(events);
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unknown error occurred';
          console.error(`Error fetching approved events: ${message}`); // Optional logging
          res.status(400).json({ error: message });
        }
      }
    
      async getPendingEvents(req: Request, res: Response) {
        try {
          const events = await eventService.getPendingEvents(req.params.managerId);
          res.status(200).json(events);
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unknown error occurred';
          console.error(`Error fetching pending events: ${message}`); // Optional logging
          res.status(400).json({ error: message });
        }
      }
    
      async getDisapprovedEvents(req: Request, res: Response) {
        try {
          const events = await eventService.getDisapprovedEvents(req.params.managerId);
          res.status(200).json(events);
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unknown error occurred';
          console.error(`Error fetching disapproved events: ${message}`); // Optional logging
          res.status(400).json({ error: message });
        }
      }
    
      async bookTicket(req: Request, res: Response) {
        try {
          const { userId, eventId, ticketType, howmany } = req.body;
          const result = await eventService.bookTicket(userId, eventId, ticketType, howmany);
          res.status(201).json(result);
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unknown error occurred';
          console.error(`Error booking ticket: ${message}`); 
          res.status(400).json({ error: message });
        }
      }
    
      async calculateRevenue(req: Request, res: Response) {
        try {
          const { managerId } = req.params;
          const result = await eventService.calculateRevenue(managerId);
          res.status(200).json(result);
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unknown error occurred';
          console.error(`Error calculating revenue: ${message}`); // Optional logging
          res.status(400).json({ error: message });
        }
      }
    }
    
