import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';

import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/schema/user.schema';

@ApiTags('Notifications')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
  ) {}

  @Version('1')
  @Roles(
    UserRole.ADMIN,
    UserRole.DOCTOR,
  )
  @Post()
  @ApiCreatedResponse({
    description: 'Notification created successfully',
  })
  create(
    @Body() dto: CreateNotificationDto,
  ) {
    return this.notificationService.create(dto);
  }

  @Version('1')
  @Roles(
    UserRole.ADMIN,
    UserRole.DOCTOR,
    UserRole.PATIENT,
  )
  @Get()
  @ApiOkResponse({
    description: 'Get all notifications',
  })
  findAll() {
    return this.notificationService.findAll();
  }

  @Version('1')
  @Roles(
    UserRole.ADMIN,
    UserRole.DOCTOR,
    UserRole.PATIENT,
  )
  @Get(':id')
  @ApiOkResponse({
    description: 'Get notification by ID',
  })
  findOne(
    @Param('id') id: string,
  ) {
    return this.notificationService.findOne(id);
  }

  @Version('1')
  @Roles(
    UserRole.ADMIN,
    UserRole.DOCTOR,
    UserRole.PATIENT,
  )
  @Patch(':id')
  @ApiOkResponse({
    description: 'Update notification',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateNotificationDto,
  ) {
    return this.notificationService.update(id, dto);
  }

  @Version('1')
  @Roles(
    UserRole.ADMIN,
    UserRole.DOCTOR,
    UserRole.PATIENT,
  )
  @Patch(':id/read')
  @ApiOkResponse({
    description: 'Mark notification as read',
  })
  markAsRead(
    @Param('id') id: string,
  ) {
    return this.notificationService.markAsRead(id);
  }

  @Version('1')
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete notification',
  })
  remove(
    @Param('id') id: string,
  ) {
    return this.notificationService.remove(id);
  }
}