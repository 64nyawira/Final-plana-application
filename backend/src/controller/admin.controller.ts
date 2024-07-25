

import { Request, Response } from 'express';
import { AdminService } from '../services/admin.service';

const adminService = new AdminService();

export class AdminController {

  async assignRole(req: Request, res: Response) {
    const { userId, role } = req.body;
    try {
      const result = await adminService.assignRole(userId, role);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }


  async assignPermissions(req: Request, res: Response) {
    const { userId, permissions } = req.body;
    try {
      const result = await adminService.assignPermissions(userId, permissions);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }


  async getAllUsers(req: Request, res: Response) {
    const role = req.user?.role; 
    try {
      const users = await adminService.getAllUsers(role || '');
      res.status(200).json(users);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }


  async getAllEvents(req: Request, res: Response) {
    try {
      const events = await adminService.getAllEvents();
      res.status(200).json(events);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }
}
