import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../user/navbar/navbar.component";
import { FooterComponent } from '../../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, FormsModule, CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  events: any[] = [];
  isFormVisible = false;
  isUpdateMode = false;
  selectedEvent: any | null = null;
  ticketType = 'single';
  isDeleteConfirmationVisible = false;
  eventToDelete: any | null = null;
  isNotificationFormVisible = false;
  imageUrl: string | null = null;
  managerId: string | null = null;

  constructor(private router: Router, private authService: AuthService, private eventService: EventService) { }

  ngOnInit(): void {
    this.loadEvents();
    const user = this.authService.getUser();
    this.managerId = user ? user.id : null;
    console.log(this.managerId);
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (data: any[]) => {
        this.events = data;
      },
      error => {
        console.error('Error fetching events', error);
      }
    );
  }

  viewEvent(id: string): void {
    this.router.navigate(['/item', id]);
  }

  showForm(): void {
    this.isFormVisible = true;
    this.isUpdateMode = false;
    this.selectedEvent = null;
  }

  hideForm(): void {
    this.isFormVisible = false;
    this.isUpdateMode = false;
    this.selectedEvent = null;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0] as File | null;
    if (file) {
      this.uploadImageToCloudinary(file).then(imageUrl => {
        this.imageUrl = imageUrl;
      });
    }
  }

  uploadImageToCloudinary(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'planaProject');
    formData.append('cloud_name', 'dqxwy25mr');

    return fetch('https://api.cloudinary.com/v1_1/dqxwy25mr/image/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log('Uploaded Image URL:', data.url);
        return data.url;
      })
      .catch(err => {
        console.error('Error uploading image:', err);
        throw err;
      });
  }

  onSubmit(form: NgForm): void {
    if (this.isUpdateMode && this.selectedEvent) {
      this.updateEvent(form);
    } else {
      this.createEvent(form);
    }
  }

  createEvent(form: NgForm): void {
    const newEvent = { ...form.value, managerId: this.managerId, image: this.imageUrl };

    this.eventService.createEvent(newEvent).subscribe(
      (data: any) => {
        this.events.push(data);
        this.hideForm();
      },
      error => {
        console.error('Error creating event', error);
      }
    );
  }

  updateEvent(form: NgForm): void {
    const updatedEvent = { ...form.value, id: this.selectedEvent!.id, managerId: this.managerId, image: this.imageUrl };

    this.eventService.updateEvent(this.selectedEvent!.id, updatedEvent).subscribe(
      (data: any) => {
        const index = this.events.findIndex(e => e.id === this.selectedEvent!.id);
        this.events[index] = data;
        this.hideForm();
      },
      error => {
        console.error('Error updating event', error);
      }
    );
  }

  cancelDelete(): void {
    this.isDeleteConfirmationVisible = false;
    this.eventToDelete = null;
  }

  confirmDelete(event: any): void {
    this.isDeleteConfirmationVisible = true;
    this.eventToDelete = event;
  }

  deleteEventConfirmed(): void {
    if (this.eventToDelete) {
      this.eventService.deleteEvent(this.eventToDelete.id).subscribe(
        () => {
          this.events = this.events.filter(event => event.id !== this.eventToDelete!.id);
          this.isDeleteConfirmationVisible = false;
          this.eventToDelete = null;
        },
        error => {
          console.error('Error deleting event', error);
        }
      );
    }
  }

  showNotificationForm(): void {
    this.isNotificationFormVisible = true;
  }

  hideNotificationForm(): void {
    this.isNotificationFormVisible = false;
  }

  sendNotification(form: NgForm): void {
    console.log('Notification sent:', form.value.notificationMessage);
    this.hideNotificationForm();
  }
}
