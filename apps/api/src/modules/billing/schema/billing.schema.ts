import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { Patient } from '../../patient/schema/patient.schema';
import { Appointment } from '../../appointment/schema/appointment.schema';

export type BillingDocument =
  HydratedDocument<Billing>;

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  CANCELLED = 'cancelled',
}

@Schema({
  timestamps: true,
})
export class Billing {
  @Prop({
    type: Types.ObjectId,
    ref: Patient.name,
    required: true,
  })
  patientId!: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Appointment.name,
    required: true,
  })
  appointmentId!: Types.ObjectId;

  @Prop({
    required: true,
    min: 0,
  })
  amount!: number;

  @Prop({
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  paymentStatus!: PaymentStatus;

  @Prop()
  paymentDate?: Date;
}

export const BillingSchema =
  SchemaFactory.createForClass(Billing);