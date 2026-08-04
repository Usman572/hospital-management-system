import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { Doctor } from '../../doctor/schema/doctor.schema';

export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema({
  timestamps: true,
})
export class Appointment {
  @Prop({
    type: Types.ObjectId,
    ref: 'Patient',
    required: true,
  })
  patientId!: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Doctor.name,
    required: true,
  })
  doctorId!: Types.ObjectId;

  @Prop({
    required: true,
  })
  appointmentDate!: Date;

  @Prop({
    required: true,
    trim: true,
  })
  reason!: string;

  @Prop({
    default: 'scheduled',
    enum: [
      'scheduled',
      'confirmed',
      'completed',
      'cancelled',
    ],
  })
  status!: string;
}

export const AppointmentSchema =
  SchemaFactory.createForClass(Appointment);