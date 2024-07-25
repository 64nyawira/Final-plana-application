import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Event } from '../../../interface/event';
import { EventService } from '../../../services/event.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-eventstbl',
  standalone: true,
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './eventstbl.component.html',
  styleUrl: './eventstbl.component.css'
})
export class EventstblComponent {
  events: any[] = [];
  isNotifyFormVisible: boolean = false;
  selectedEventId: number | null = null;
  notificationMessage: string = '';
  
  constructor(private eventService:EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  
  loadEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (data: any[]) => {
        this.events = data;
        console.log(this.events)
      },
      error => {
        console.error('Error fetching events', error);
      }
    );
  }

  approveEvent(eventId: number): void {
    console.log(`Event ${eventId} approved.`);
  }

  disapproveEvent(eventId: number): void {
    console.log(`Event ${eventId} disapproved.`);
  }

  notifyEvent(eventId: number): void {
    console.log(`Notify action triggered for event ${eventId}.`);
  }

  showNotifyForm(eventId: number): void {
    this.selectedEventId = eventId;
    this.isNotifyFormVisible = true;
  }

  hideNotifyForm(): void {
    this.selectedEventId = null;
    this.notificationMessage = '';
    this.isNotifyFormVisible = false;
  }

  sendNotification(): void {
    if (this.selectedEventId && this.notificationMessage) {
      console.log(`Notification sent for event ${this.selectedEventId}: ${this.notificationMessage}`);
      // Add logic to send the notification to the manager
      this.hideNotifyForm();
    } else {
      alert('Please enter a message before sending.');
    }
  }
}
