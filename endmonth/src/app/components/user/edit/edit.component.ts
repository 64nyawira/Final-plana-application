import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  profile = {
    username: '',
    email: '',
    fullName: '',
    alternateEmail: '',
    location: ''
  };

  profileImageUrl: string | ArrayBuffer | null = null;

  constructor(private router: Router,private location:Location) {}

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.profileImageUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    // Handle form submission logic, e.g., send data to a server
    console.log('Profile updated:', this.profile);
    this.router.navigate(['/']); // Navigate back to the desired page after saving
  }
  goBack(): void {
    this.location.back();
  }
}
