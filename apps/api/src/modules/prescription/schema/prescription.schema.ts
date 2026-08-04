import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { Patient } from '../../patient/schema/patient.schema';
import { Doctor } from '../../doctor/schema/doctor.schema';
import { MedicalRecord } from '../../medical-record/schema/medical-record.schema';

export type PrescriptionDocument =
  HydratedDocument<Prescription>;

@Schema({
  timestamps: true,
})
export class Prescription {
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
    type: Types.ObjectId,
    ref: MedicalRecord.name,
    required: true,
  })
  medicalRecordId!: Types.ObjectId;

  @Prop({
    required: true,
    trim: true,
  })
  medicineName!: string;

  @Prop({
    required: true,
    trim: true,
  })
  dosage!: string;

  @Prop({
    required: true,
    trim: true,
  })
  duration!: string;

  @Prop({
    required: true,
    trim: true,
  })
  instructions!: string;
}

export const PrescriptionSchema =
  SchemaFactory.createForClass(Prescription);