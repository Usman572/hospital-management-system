import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database';
import { configuration, validationSchema } from './config';
import { LoggerModule } from './common/logger';
import { PatientModule } from './modules/patient/patient.module';
import { HealthModule } from './modules/health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { DepartmentModule } from './modules/department/department.module';
import { MedicalRecordModule } from './modules/medical-record/medical-record.module';
import { PrescriptionModule } from './modules/prescription/prescription.module';
import { BillingModule } from './modules/billing/billing.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
      envFilePath: [
        `.env.${process.env.NODE_ENV || 'development'}`,
        '.env',
      ],
    }),

    DatabaseModule,
    LoggerModule,
    PatientModule,
    HealthModule,
    AuthModule,
    AppointmentModule,
    DoctorModule,
    DepartmentModule,
    MedicalRecordModule,
    PrescriptionModule,
    BillingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}