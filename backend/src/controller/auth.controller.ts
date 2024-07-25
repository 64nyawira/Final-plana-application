import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const user = await authService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      res.status(400).json({ error: message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { token, user } = await authService.login(req.body);
      res.status(200).json({ token, user });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      res.status(400).json({ error: message });
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const message = await authService.forgotPassword(req.body);
      res.status(200).json(message);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      res.status(400).json({ error: message });
    }
  }

  async verifyResetCode(req: Request, res: Response) {
    try {
      const message = await authService.verifyResetCode(req.body);
      res.status(200).json(message);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      res.status(400).json({ error: message });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const message = await authService.resetPassword(req.body);
      res.status(200).json(message);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      res.status(400).json({ error: message });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const user = await authService.getUserById(userId);
      res.status(200).json(user);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      res.status(404).json({ error: message });
    }
  }


  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await authService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      res.status(400).json({ error: message });
    }
  }

  async getAllBookings(req: Request, res: Response) {
    try {
      const bookings = await authService.getAllBookings();
      res.status(200).json(bookings);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      res.status(400).json({ error: message });
    }
  }

  async getUserBookings(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const bookings = await authService.getUserBookings(userId);
      res.status(200).json(bookings);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      res.status(400).json({ error: message });
    }
  }

  async cancelBooking(req: Request, res: Response) {
    try {
      const bookingId = req.params.bookingId;
      const message = await authService.cancelBooking(bookingId);
      res.status(200).json(message);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      res.status(400).json({ error: message });
    }
  }

  async assignManagerRole(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const message = await authService.assignManagerRole(userId);
      res.status(200).json(message);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      res.status(400).json({ error: message });
    }
  }

  async assignUserRole(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const message = await authService.assignUserRole(userId);
      res.status(200).json(message);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      res.status(400).json({ error: message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const message = await authService.deleteUser(userId);
      res.status(200).json(message);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      res.status(400).json({ error: message });
    }
  }
}
