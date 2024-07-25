// src/routes/eventRouter.ts

import { Router } from 'express';
import { EventController } from '../controller/event.controller';
import { authMiddleware, authorizeRoles } from '../middleware/auth.midd;eware';

const eventRouter = Router();
const eventController = new EventController();

eventRouter.post('/create', authMiddleware, authorizeRoles('manager','admin'), eventController.createEvent);
eventRouter.get('/getone/:id', authMiddleware, eventController.getEventById);
eventRouter.put('/update/:id', authMiddleware, authorizeRoles('manager'), eventController.updateEvent);
eventRouter.delete('/delete/:id', authMiddleware, authorizeRoles('manager', 'admin'), eventController.deleteEvent);
eventRouter.get('/all', eventController.getAllEvents);
eventRouter.get('/attendees', authMiddleware, authorizeRoles('admin','manager'), eventController.getAllAttendees);
eventRouter.get('/managers', authMiddleware, authorizeRoles('admin'), eventController.getAllManagers);
eventRouter.put('/approve/:id', eventController.approveEvent); // No auth for admin approval link
eventRouter.put('/disapprove/:id', eventController.disapproveEvent); // No auth for admin disapproval link
eventRouter.get('/approved/:managerId', authMiddleware, authorizeRoles('manager', 'admin'), eventController.getApprovedEvents);
eventRouter.get('/pending/:managerId', authMiddleware, authorizeRoles('manager', 'admin'), eventController.getPendingEvents);
eventRouter.get('/disapproved/:managerId', authMiddleware, authorizeRoles('manager', 'admin'), eventController.getDisapprovedEvents);
eventRouter.post('/book-ticket', eventController.bookTicket);
eventRouter.get('/calculate-revenue/:managerId', authMiddleware, authorizeRoles('manager', 'admin'), eventController.calculateRevenue);

export default eventRouter;
