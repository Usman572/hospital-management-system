import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
import { NotificationModule } from './modules/notification/notification.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { FileModule } from './modules/file/file.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
    rootPath: join(process.cwd(), 'uploads'),
    serveRoot: '/uploads',
  }),

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
    NotificationModule,
    DashboardModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}