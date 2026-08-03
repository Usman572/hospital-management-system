import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

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
    required: true,
    trim: true,
  })
  doctorName!: string;

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
      'completed',
      'cancelled',
    ],
  })
  status!: string;
}

export const AppointmentSchema =
  SchemaFactory.createForClass(Appointment);