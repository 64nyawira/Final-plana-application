import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Event } from '../../../interface/event';
import { FooterComponent } from "../../footer/footer.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { Booking } from '../../../interface/bookings';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [FormsModule, CommonModule, FooterComponent, SidebarComponent],
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  bookings: Booking[] = [];
  event:Event|undefined;

  constructor(private userService: UserService, private authService: AuthService, private eventService: EventService) {}

  ngOnInit(): void {
    try {
      const userId = this.authService.getUserId();
      this.userService.getUserBookings(userId).subscribe({
        next: (data: Booking[]) => {
          this.bookings = data;
          console.log(this.bookings);
        },
        error: (error: any) => {
          console.error('Error fetching bookings:', error);
        }
      });
    } catch (error) {
      console.error('Error getting user ID:', error);
    }
  }

  cancelBooking(booking: Booking): void {
    this.userService.cancelBooking(booking.id).subscribe({
      next: () => {
        booking.statu = 'Cancelled';
        console.log(`Booking ${booking.id} cancelled`);
      },
      error: (error: any) => {
        console.error('Error cancelling booking:', error);
      }
    });
  }

  deleteBooking(booking: Booking): void {
    this.userService.cancelBooking(booking.id).subscribe({
      next: () => {
        const index = this.bookings.indexOf(booking);
        if (index !== -1) {
          this.bookings.splice(index, 1);
          console.log(`Booking ${booking.id} deleted`);
        }
      },
      error: (error: any) => {
        console.error('Error deleting booking:', error);
      }
    });
  }
}
