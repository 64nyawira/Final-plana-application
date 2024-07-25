import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Event } from '../interface/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'http://localhost:3000/event';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  createEvent(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, data, { headers: this.getHeaders() });
  }

  getAllEvents(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`, { headers: this.getHeaders() });
  }

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/getone/${id}`, { headers: this.getHeaders() });
  }

  bookTicket(bookingData: { userId: string, eventId: string, ticketType: string, howmany: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}/book-ticket`, bookingData, { headers: this.getHeaders() });
  }

  updateEvent(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, data, { headers: this.getHeaders() });
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { headers: this.getHeaders() });
  }

  approveEvent(id: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/approve/${id}`, {}, { headers: this.getHeaders() });
  }

  disapproveEvent(id: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/disapprove/${id}`, {}, { headers: this.getHeaders() });
  }

  getApprovedEvents(managerId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/approved/${managerId}`, { headers: this.getHeaders() });
  }

  getPendingEvents(managerId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/pending/${managerId}`, { headers: this.getHeaders() });
  }

  getDisapprovedEvents(managerId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/rejected/${managerId}`, { headers: this.getHeaders() });
  }

  calculateRevenue(managerId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/revenue/${managerId}`, { headers: this.getHeaders() });
  }
}
