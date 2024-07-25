export interface Event {
  id:string;
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
  time?: Date;
  location?: string;
  ticketTypes?: string;
  peoplePerTicket?: number;
  no_tickets?: number;
  pricing?: number;
  groupPrice?: number;
  managerId?: string;
}
  