import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { Department } from '../../department/schema/department.schema';

export type DoctorDocument = HydratedDocument<Doctor>;

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
    type: Types.ObjectId,
    ref: Department.name,
    required: true,
  })
  departmentId!: Types.ObjectId;

  @Prop({
    default: true,
  })
  isActive!: boolean;
}

export const DoctorSchema =
  SchemaFactory.createForClass(Doctor);