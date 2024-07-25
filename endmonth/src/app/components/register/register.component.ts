import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = ''; 
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  register(): void {
    console.log({ name: this.name, email: this.email, password: this.password, role: this.role }); // Debug log
    this.userService.register({ name: this.name, email: this.email, password: this.password, role: this.role }).subscribe(
      response => {
        console.log(response);
        console.log('Registration successful:', response);
        this.successMessage = 'Registration successful! Redirecting to login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error => {
        this.errorMessage = 'Registration failed. Please try again.';
        console.error('Registration error:', error);
      }
    );
  }
}
