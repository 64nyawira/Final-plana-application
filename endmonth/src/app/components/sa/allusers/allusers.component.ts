import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../user/navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { user } from '../../../interface/user';

@Component({
  selector: 'app-allusers',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterLink, FormsModule],
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {
  users: user[] = [];
  isDeleteConfirmationVisible = false;
  userToDelete: user | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        console.log(this.users);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }
  onRoleChange(user: user): void {
    if (user.role === 'manager') {
      this.userService.assignManagerRole(user.id!).subscribe({
        next: () => {
          console.log(`Assigned manager role to user ${user.id}`);

          this.updateUserRoleInLocalList(user.id!, 'manager');
        },
        error: (error) => {
          console.error('Error assigning manager role:', error);
        }
      });
    } else if (user.role === 'attendee') {
      this.userService.assignUserRole(user.id!).subscribe({
        next: () => {
          console.log(`Assigned attendee role to user ${user.id}`);
   
          this.updateUserRoleInLocalList(user.id!, 'attendee');
        },
        error: (error) => {
          console.error('Error assigning attendee role:', error);
        }
      });
    }
  }

  updateUserRoleInLocalList(userId: string, role: string): void {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.role = role;
    }
  }

  confirmDelete(user: user): void {
    this.isDeleteConfirmationVisible = true;
    this.userToDelete = user;
  }

  deleteConfirmed(): void {
    if (this.userToDelete) {
      this.userService.deleteUser(this.userToDelete.id!).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== this.userToDelete?.id);
          this.isDeleteConfirmationVisible = false;
          this.userToDelete = null;
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        }
      });
    }
  }

  cancelDelete(): void {
    this.isDeleteConfirmationVisible = false;
    this.userToDelete = null;
  }
}
