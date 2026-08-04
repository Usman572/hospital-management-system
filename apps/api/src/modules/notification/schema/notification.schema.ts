import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { User } from '../../auth/schema/user.schema';

export type NotificationDocument =
  HydratedDocument<Notification>;

export enum NotificationType {
  APPOINTMENT = 'appointment',
  PRESCRIPTION = 'prescription',
  BILLING = 'billing',
  SYSTEM = 'system',
}

@Schema({
  timestamps: true,
})
export class Notification {
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  userId!: Types.ObjectId;

  @Prop({
    enum: NotificationType,
    required: true,
  })
  type!: NotificationType;

  @Prop({
    required: true,
    trim: true,
  })
  message!: string;

  @Prop({
    default: false,
  })
  isRead!: boolean;
}

export const NotificationSchema =
  SchemaFactory.createForClass(Notification);