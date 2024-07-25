import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Booking } from '../interface/bookings';
import { user } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/register`, data);
  }

  
  getUserById(userId: string): Observable<user> {
    const headers = this.getAuthHeaders();
    return this.http.get<user>(`${this.baseUrl}/user/${userId}`, { headers });
  }

  login(data: { email: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/user/login`, data, { headers });
  }

  getAllUsers(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/user/users/`, { headers });
  }

  getAttendees(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/event/attendees`, { headers });
  }

  getManagers(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/event/managers`, { headers });
  }

  forgotPassword(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/forgot-password`, data);
  }

  verifyResetCode(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/verify-reset-code`, data);
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/reset-password`, data);
  }

  bookTicket(data: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/user/book-ticket`, data, { headers });
  }

  getAllBookings(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/user/bookings`, { headers });
  }

  getUserBookings(userId: string): Observable<Booking[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Booking[]>(`${this.baseUrl}/user/userbookings/${userId}`, { headers });
  }

  cancelBooking(bookingId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.baseUrl}/user/delete/${bookingId}`, { headers });
  }

  assignManagerRole(userId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.baseUrl}/user/assign-manager/${userId}`, {}, { headers });
  }

  assignUserRole(userId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.baseUrl}/user/assign-user/${userId}`, {}, { headers });
  }

  // assignRole(userId: string, role: string): Observable<any> {
  //   const headers = this.getAuthHeaders();
  //   return this.http.put(`${this.baseUrl}/user/assign-role/${userId}`, { role }, { headers });
  // }

  deleteUser(userId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.baseUrl}/user/user/${userId}`, { headers });
  }
}
