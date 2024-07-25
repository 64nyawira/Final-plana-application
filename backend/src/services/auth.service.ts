import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role?: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface ForgotPasswordInput {
  email: string;
}

interface VerifyResetCodeInput {
  email: string;
  code: string;
}

interface ResetPasswordInput {
  email: string;
  newPassword: string;
}

export class AuthService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    this.transporter.verify((error, success) => {
      if (error) {
        console.error('SMTP configuration error:', error);
      } else {
        console.log('SMTP configuration successful:', success);
      }
    });
  }

  async register({ name, email, password, role = 'attendee' }: RegisterInput) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });
    return { user, message: 'You have been registered successfully!' };
  }

  async login({ email, password }: LoginInput) {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        console.error('User not found:', email);
        throw new Error('Invalid credentials');
      }
      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
        console.error('Invalid password for user:', email);
        throw new Error('Invalid credentials');
      }
      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
      return { user, token };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
  

  async forgotPassword({ email }: ForgotPasswordInput) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.user.update({
      where: { email },
      data: {
        resetCode,
        resetCodeExpiry: new Date(Date.now() + 3600000), // 1 hour expiry
      },
    });

    try {
      await this.transporter.sendMail({
        from: `"Plana Support" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Password Reset Code',
        text: `Your password reset code is ${resetCode}. This code will expire in 1 hour.`,
      });
      return { message: 'Password reset code sent to email' };
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error sending email:', error.message);
        console.error('Error details:', (error as any).response);
      } else {
        console.error('Unexpected error sending email:', error);
      }
      throw new Error('Failed to send password reset email');
    }
  }

  async verifyResetCode({ email, code }: VerifyResetCodeInput) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.resetCode !== code || user.resetCodeExpiry! < new Date()) {
      return { valid: false };
      throw new Error('Invalid or expired reset code');
    }
    return { valid: true };
    return { message: 'Reset code verified' };
  }

  

  async resetPassword({ email, newPassword }: ResetPasswordInput) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        resetCode: null,
        resetCodeExpiry: null,
      },
    });
    return { message: 'Password reset successful' };
  }


  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async getAllBookings() {
    const bookings = await prisma.booking.findMany();
    return bookings;
  }

  async getUserBookings(userId: string) {
    const bookings = await prisma.booking.findMany({
      where: { userId },
    });
    return bookings;
  }

  async cancelBooking(bookingId: string) {
    await prisma.booking.delete({
      where: { id: bookingId },
    });
    return { message: 'Booking cancelled successfully' };
  }

  async getAllUsers() {
    const users = await prisma.user.findMany();
    return users;
  }

  async assignManagerRole(userId: string) {
    await prisma.user.update({
      where: { id: userId },
      data: { role: 'manager' },
    });
    return { message: 'Manager role assigned successfully' };
  }

  async assignUserRole(userId: string) {
    await prisma.user.update({
      where: { id: userId },
      data: { role: 'attendee' },
    });
    return { message: 'attendee role assigned successfully' };
  }

  async deleteUser(userId: string) {
    await prisma.user.delete({
      where: { id: userId },
    });
    return { message: 'User deleted successfully' };
  }
}
