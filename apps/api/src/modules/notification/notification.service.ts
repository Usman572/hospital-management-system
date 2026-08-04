import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Notification,
  NotificationDocument,
} from './schema/notification.schema';

import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>,
  ) {}

  async create(
    dto: CreateNotificationDto,
  ) {
    const notification =
      new this.notificationModel(dto);

    return notification.save();
  }

  async findAll() {
    return this.notificationModel
      .find()
      .populate('userId')
      .exec();
  }

  async findOne(
    id: string,
  ) {
    return this.notificationModel
      .findById(id)
      .populate('userId')
      .exec();
  }

  async update(
    id: string,
    dto: UpdateNotificationDto,
  ) {
    return this.notificationModel
      .findByIdAndUpdate(
        id,
        dto,
        {
          new: true,
          runValidators: true,
        },
      )
      .exec();
  }

  async markAsRead(
    id: string,
  ) {
    return this.notificationModel
      .findByIdAndUpdate(
        id,
        {
          isRead: true,
        },
        {
          new: true,
        },
      )
      .exec();
  }

  async remove(
    id: string,
  ) {
    return this.notificationModel
      .findByIdAndDelete(id)
      .exec();
  }
}