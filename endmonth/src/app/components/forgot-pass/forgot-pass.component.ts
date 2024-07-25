import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent {
  constructor(private http: HttpClient, private router: Router) {}

  enterEmail(form: NgForm): void {
    if (form.valid) {
      const email = form.value.email;
      console.log('Entered email:', email);
      this.http.post('http://localhost:3000/user/forgot-password', { email })
        .subscribe(
          response => {
            console.log('Forgot password response:', response);
            this.router.navigate(['/code']);
          },
          error => {
            console.error('Forgot password error:', error);
          }
        );
    }
  }
}


// import { Component } from '@angular/core';
// import { UserService } from '../../services/user.service';
// import { Router, RouterLink } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-forgot-pass',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterLink],
//   templateUrl: './forgot-pass.component.html',
//   styleUrls: ['./forgot-pass.component.css']
// })
// export class ForgotPassComponent {
//   email: string = '';
//   message: string = '';

//   constructor(private userService: UserService, private router: Router) {}

//   enterEmail(): void {
//     console.log('Entered email:', this.email); // Log the entered email before making the request

//     this.userService.forgotPassword({ email: this.email }).subscribe(
//       response => {
//         console.log('Forgot password response:', response);
//         if (response.success) {
//           this.message = 'A reset link has been sent to your email.';
//         } else {
//           this.message = 'Failed to send reset link. Please try again.';
//         }
//       },
//       error => {
//         this.message = 'Failed to send reset link. Please try again.';
//         console.error('Forgot password error:', error);
//       }
//     );
//   }
// }
