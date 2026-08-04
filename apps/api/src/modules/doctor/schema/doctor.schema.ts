import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DoctorDocument = Doctor & Document;

@Schema({
  timestamps: true,
})
export class Doctor {
  @Prop({
    required: true,
    trim: true,
  })
  fullName!: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email!: string;

  @Prop({
    required: true,
    trim: true,
  })
  specialization!: string;

  @Prop({
    required: true,
  })
  phone!: string;

  @Prop({
    default: true,
  })
  isActive!: boolean;
}

export const DoctorSchema =
  SchemaFactory.createForClass(Doctor);