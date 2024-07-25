export interface Event {
  title: string;
  no_tickets: number;
  pricing?: number;
  groupPrice?: number;
}

export interface Booking {
  id: string;
  userId: string;
  eventId: string;
  ticketType: string;
  howmany: number;
  bookingDate: Date;
  statu: string;
  event?: Event; 
}
