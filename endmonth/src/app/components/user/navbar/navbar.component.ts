import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { user } from '../../../interface/user';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isProfileDropdownOpen = false;
  user: user | undefined;

  constructor(private userService: UserService,private authService:AuthService) {}

  ngOnInit(): void {
    this.loadUserDetails();
  }

  toggleProfileDropdown() {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  loadUserDetails(): void {
    const userId = this.authService.getUserId(); // Assuming authService has a method to get the logged-in user's ID
    this.userService.getUserById(userId).subscribe(
      data => {
        this.user = data;
      },
      error => {
        console.error('Error fetching user details:', error);
      }
    );
  }
}
