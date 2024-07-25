
import { Component, OnInit } from '@angular/core';
import { Event } from '../../../interface/event';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-recommended-events',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './recommended-events.component.html',
  styleUrls: ['./recommended-events.component.css']
})
export class RecommendedEventsComponent implements OnInit {
  events: Event[] = [];
 

  constructor(private eventService:EventService, private router: Router) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (data: Event[]) => {
        this.events = data;
        console.log(data)
      },
      error => {
        console.error('Error fetching events:', error);
      }
    );
  }

  viewEvent(id?: string): void {
    if (id) {
      this.router.navigate(['/item', id]);
    } else {
      console.error('Event ID is undefined');
    }
  }
}
