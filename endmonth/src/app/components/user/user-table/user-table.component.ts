import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { user } from '../../../interface/user';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  users: user[] = [];
  selectedUser: any = null;
  notificationMessage: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getAttendees().subscribe({
      next: (data) => {
        this.users = data;
        console.log(this.users);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  showNotificationForm(user: any): void {
    this.selectedUser = user;
  }

  sendNotification(): void {
    console.log(`Notification sent to ${this.selectedUser.username}: ${this.notificationMessage}`);
    this.resetNotificationForm();
  }

  cancelNotification(): void {
    this.resetNotificationForm();
  }

  private resetNotificationForm(): void {
    this.selectedUser = null;
    this.notificationMessage = '';
  }
}
