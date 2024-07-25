// login.component.ts
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

  login(): void {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    
    this.userService.login({ email: this.email, password: this.password }).subscribe(
      response => {
        console.log('Login payload:', { email: this.email, password: this.password });
        console.log('Login response:', response);
        if (response.user && response.token) {
          this.authService.saveToken(response.token);
          this.authService.saveUser(response.user);
          if (this.email === 'nyawira@gmail.com') {
            this.router.navigate(['/sa']);
          } else if (response.user.role === 'manager') {
            this.router.navigate(['/manager']);
          } else if (response.user.role === 'attendee' || response.user.role === '') {
            this.router.navigate(['/user']);
          } else {
            this.errorMessage = 'Unauthorized access';
          }
        } else {
          this.errorMessage = 'Invalid login response. Please try again.';
        }
      },
      error => {
        this.errorMessage = 'Invalid email or password';
        console.error('Login error:', error);
      }
    );
  }
}
