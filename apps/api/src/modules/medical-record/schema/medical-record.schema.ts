import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { Patient } from '../../patient/schema/patient.schema';
import { Doctor } from '../../doctor/schema/doctor.schema';

export type MedicalRecordDocument =
  HydratedDocument<MedicalRecord>;

@Schema({
  timestamps: true,
})
export class MedicalRecord {
  @Prop({
    type: Types.ObjectId,
    ref: Patient.name,
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
    trim: true,
  })
  diagnosis!: string;

  @Prop({
    required: true,
    trim: true,
  })
  symptoms!: string;

  @Prop({
    required: true,
    trim: true,
  })
  prescription!: string;

  @Prop({
    trim: true,
  })
  notes?: string;
}

export const MedicalRecordSchema =
  SchemaFactory.createForClass(MedicalRecord);