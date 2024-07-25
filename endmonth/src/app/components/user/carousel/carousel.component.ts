import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../interface/event';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  events: Event[] = [];
  currentIndex = 0;

  constructor(private router: Router, private eventService: EventService) {}

  ngOnInit() {
    this.fetchEvents();
    setInterval(() => {
      this.transitionEvents();
    }, 6000); // Delay the transition to 6 seconds
  }

  fetchEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (data: Event[]) => {
        this.events = data.slice(0, 3); // Get only the first three events
        console.log(this.events);
      },
      error: (error) => {
        console.error('Error fetching events:', error);
      }
    });
  }

  getClass(index: number) {
    if (index === this.currentIndex) {
      return 'current';
    } else if (index === (this.currentIndex + this.events.length - 1) % this.events.length) {
      return 'previous';
    } else if (index === (this.currentIndex + 1) % this.events.length) {
      return 'next';
    } else {
      return 'hidden';
    }
  }

  transitionEvents() {
    this.currentIndex = (this.currentIndex + 1) % this.events.length;
  }
}
