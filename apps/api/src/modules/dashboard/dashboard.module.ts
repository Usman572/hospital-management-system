import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

import {
  Patient,
  PatientSchema,
} from '../patient/schema/patient.schema';

import {
  Doctor,
  DoctorSchema,
} from '../doctor/schema/doctor.schema';

import {
  Appointment,
  AppointmentSchema,
} from '../appointment/schema/appointment.schema';

import {
  Department,
  DepartmentSchema,
} from '../department/schema/department.schema';

import {
  MedicalRecord,
  MedicalRecordSchema,
} from '../medical-record/schema/medical-record.schema';

import {
  Prescription,
  PrescriptionSchema,
} from '../prescription/schema/prescription.schema';

import {
  Billing,
  BillingSchema,
} from '../billing/schema/billing.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Patient.name,
        schema: PatientSchema,
      },
      {
        name: Doctor.name,
        schema: DoctorSchema,
      },
      {
        name: Appointment.name,
        schema: AppointmentSchema,
      },
      {
        name: Department.name,
        schema: DepartmentSchema,
      },
      {
        name: MedicalRecord.name,
        schema: MedicalRecordSchema,
      },
      {
        name: Prescription.name,
        schema: PrescriptionSchema,
      },
      {
        name: Billing.name,
        schema: BillingSchema,
      },
    ]),
  ],
  controllers: [
    DashboardController,
  ],
  providers: [
    DashboardService,
  ],
})
export class DashboardModule {}