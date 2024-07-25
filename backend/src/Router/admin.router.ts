// src/routes/adminRouter.ts

import { Router } from 'express';
import { AdminController } from '../controller/admin.controller';

const adminRouter = Router();
const adminController = new AdminController();

adminRouter.post('/assign-role', adminController.assignRole);
adminRouter.post('/assign-permissions', adminController.assignPermissions);
adminRouter.get('/users', adminController.getAllUsers);
adminRouter.get('/events', adminController.getAllEvents);

export default adminRouter;
