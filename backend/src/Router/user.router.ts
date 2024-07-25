import { Router } from 'express';
import { AuthController } from '../controller/auth.controller';
import { authMiddleware, authorizeRoles } from '../middleware/auth.midd;eware';


const userRouter = Router();
const authController = new AuthController();

userRouter.post('/register', authController.register);
userRouter.post('/login', authController.login);
userRouter.post('/forgot-password', authController.forgotPassword);
userRouter.post('/verify-reset-code', authController.verifyResetCode);
userRouter.post('/reset-password', authController.resetPassword);
userRouter.get('user/:id',authController.getUserById)
userRouter.get('/users', authMiddleware, authorizeRoles('admin','manager'), authController.getAllUsers);
userRouter.get('/bookings', authMiddleware, authController.getAllBookings);
userRouter.get('/userbookings/:userId', authMiddleware, authController.getUserBookings);
userRouter.delete('/delete/:bookingId', authMiddleware, authorizeRoles('user', 'manager', 'admin'), authController.cancelBooking);
userRouter.put('/assign-manager/:userId', authMiddleware, authorizeRoles('admin'), authController.assignManagerRole);
userRouter.put('/assign-attendee/:userId', authMiddleware, authorizeRoles('admin'), authController.assignUserRole);
userRouter.delete('/user/:userId', authMiddleware, authorizeRoles('admin'), authController.deleteUser);

export default userRouter;
