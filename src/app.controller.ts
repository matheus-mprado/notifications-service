import { Controller, Get, Post, Body } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { randomUUID } from "node:crypto";
import { CreateNotificationBody } from "./create-notification-body";

interface CreateData {
  recipientId: string;
  category: string;
  content: string;
}

@Controller("notifications")
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list() {
    return this.prisma.notification.findMany();
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, category, content } = body;

    await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        content,
        category,
        recipientId,
      },
    });
  }
}
