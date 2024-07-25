import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pass-code',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pass-code.component.html',
  styleUrls: ['./pass-code.component.css']
})
export class PassCodeComponent {
  email: string = '';
  resetCode: string = '';
  message: string = '';
  private baseUrl: string = 'http://localhost:3000'; // Ensure this matches your backend URL

  constructor(private http: HttpClient, private router: Router) {}

  enterCode(form: NgForm): void {
    if (form.valid) {
      console.log('Entered email:', this.email);
      console.log('Entered reset code:', this.resetCode);
      this.http.post<{ valid: boolean }>(`${this.baseUrl}/user/verify-reset-code`, { email: this.email, code: this.resetCode })
        .subscribe(
          response => {
            console.log('Verify reset code response:', response);
            if (response.valid) {
              this.router.navigate(['/reset']);
            } else {
              this.message = 'Invalid reset code. Please try again.';
            }
          },
          error => {
            this.message = 'Failed to verify reset code. Please try again.';
            console.error('Verify reset code error:', error);
          }
        );
    }
  }
}
