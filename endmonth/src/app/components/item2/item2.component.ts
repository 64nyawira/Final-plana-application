import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Event } from '../../interface/event';
import { UserService } from '../../services/user.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item2.component.html',
  styleUrls: ['./item2.component.css']
})
export class Item2Component implements OnInit {
  event: Event | undefined;
  showForm: boolean = false;
  showConfirmation: boolean = false;
  tickets: number = 1;
  paymentMethod: string = 'singles';
  userId: string | null = ''; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId(); 
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventService.getEventById(id).subscribe({
        next: (data: Event) => {
          this.event = data;
          console.log(this.event); 
        },
        error: (error: any) => {
          console.error('Error fetching event:', error);
        }
      });
    }
  }

  bookNow(): void {
    this.showForm = true;
  }

  goBack(): void {
    this.router.navigate(['/user']);
  }

  submitForm(): void {
    if (this.event && this.userId) {
      const bookingData = {
        userId: this.userId,
        eventId: this.event.id,
        ticketType: this.paymentMethod,
        howmany: this.tickets
      };
      this.eventService.bookTicket(bookingData).subscribe({
        next: (response: any) => {
          console.log('Booking successful:', response);
          this.showForm = false;
          this.showConfirmation = true;
        },
        error: (error: any) => {
          console.error('Error booking ticket:', error);
        }
      });
    }
  }

  cancelBooking(): void {
    this.showForm = false;
  }

  closeConfirmation(): void {
    this.showConfirmation = false;
    this.goBack();
  }

  cancelConfirmation(): void {
    this.showConfirmation = false;
  }
}
