import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';

import {
  NotificationType,
} from '../schema/notification.schema';

export class CreateNotificationDto {
  @IsMongoId()
  @IsNotEmpty()
  userId!: string;

  @IsEnum(NotificationType)
  @IsNotEmpty()
  type!: NotificationType;

  @IsString()
  @IsNotEmpty()
  message!: string;
}