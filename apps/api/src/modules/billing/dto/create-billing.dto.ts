import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDateString,
  IsEnum,
} from 'class-validator';

import {
  PaymentStatus,
} from '../schema/billing.schema';

export class CreateBillingDto {
  @IsMongoId()
  @IsNotEmpty()
  patientId!: string;

  @IsMongoId()
  @IsNotEmpty()
  appointmentId!: string;

  @IsNumber()
  @IsNotEmpty()
  amount!: number;

  @IsEnum(PaymentStatus)
  @IsOptional()
  paymentStatus?: PaymentStatus;

  @IsDateString()
  @IsOptional()
  paymentDate?: Date;
}