// src/services/adminService.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AdminService {
  async assignRole(userId: string, role: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { role },
    });
  }

  
  async assignPermissions(userId: string, permissionIds: string[]) {
    await prisma.userPermission.deleteMany({ where: { userId } });

    const permissionsData = permissionIds.map((permissionId) => ({
      userId,
      permissionId,
    }));

    return prisma.userPermission.createMany({
      data: permissionsData,
    });
  }

  async getAllUsers(role: string) {
    if (role === 'SuperAdmin') {
      return prisma.user.findMany();
    } else if (role === 'Manager') {
      return prisma.user.findMany({ where: { role: 'Attendee' } });
    } else {
      throw new Error('Access denied');
    }
  }

  async getAllEvents() {
    return prisma.event.findMany();
  }
}
