// src/app/users.ts
export const users = [
    {
      id: 1,
      username: 'user1',
      email: 'user1@example.com',
      role: 'Manager',
      permissions: {
        notify: true,
        delete: true
      }
    },
    {
      id: 2,
      username: 'user2',
      email: 'user2@example.com',
      role: 'Attendee',
      permissions: {
        notify: true,
        delete: false
      }
    },
    {
      id: 3,
      username: 'user3',
      email: 'user3@example.com',
      role: 'Attendee',
      permissions: {
        notify: false,
        delete: false
      }
    }
    // Add more users as needed
  ];
  