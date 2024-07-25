import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pass-reset',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pass-reset.component.html',
  styleUrls: ['./pass-reset.component.css']
})
export class PassResetComponent {
  email: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';

  constructor(private userService: UserService, private router: Router) {}

  resetPassword(form: NgForm): void {
    if (form.valid) {
      if (this.newPassword !== this.confirmPassword) {
        this.message = 'Passwords must match.';
        return;
      }

      this.userService.resetPassword({ email: this.email, newPassword: this.newPassword }).subscribe(
        response => {
          console.log('Reset password response:', response);
          this.message = 'Password has been reset successfully. Redirecting to login...';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        error => {
          this.message = 'Failed to reset password. Please try again.';
          console.error('Reset password error:', error);
        }
      );
    }
  }
}
