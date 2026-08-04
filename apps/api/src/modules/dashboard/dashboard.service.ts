import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Patient,
  PatientDocument,
} from '../patient/schema/patient.schema';

import {
  Doctor,
  DoctorDocument,
} from '../doctor/schema/doctor.schema';

import {
  Appointment,
  AppointmentDocument,
} from '../appointment/schema/appointment.schema';

import {
  Department,
  DepartmentDocument,
} from '../department/schema/department.schema';

import {
  MedicalRecord,
  MedicalRecordDocument,
} from '../medical-record/schema/medical-record.schema';

import {
  Prescription,
  PrescriptionDocument,
} from '../prescription/schema/prescription.schema';

import {
  Billing,
  BillingDocument,
  PaymentStatus,
} from '../billing/schema/billing.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Patient.name)
    private readonly patientModel: Model<PatientDocument>,

    @InjectModel(Doctor.name)
    private readonly doctorModel: Model<DoctorDocument>,

    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<AppointmentDocument>,

    @InjectModel(Department.name)
    private readonly departmentModel: Model<DepartmentDocument>,

    @InjectModel(MedicalRecord.name)
    private readonly medicalRecordModel: Model<MedicalRecordDocument>,

    @InjectModel(Prescription.name)
    private readonly prescriptionModel: Model<PrescriptionDocument>,

    @InjectModel(Billing.name)
    private readonly billingModel: Model<BillingDocument>,
  ) {}

  async getAdminDashboard() {
    const [
      totalPatients,
      totalDoctors,
      totalAppointments,
      totalDepartments,
      totalMedicalRecords,
      totalPrescriptions,
      totalBills,
      pendingBills,
      revenue,
    ] = await Promise.all([
      this.patientModel.countDocuments(),
      this.doctorModel.countDocuments(),
      this.appointmentModel.countDocuments(),
      this.departmentModel.countDocuments(),
      this.medicalRecordModel.countDocuments(),
      this.prescriptionModel.countDocuments(),
      this.billingModel.countDocuments(),
      this.billingModel.countDocuments({
        paymentStatus: PaymentStatus.PENDING,
      }),
      this.billingModel.aggregate([
        {
          $match: {
            paymentStatus: PaymentStatus.PAID,
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: '$amount',
            },
          },
        },
      ]),
    ]);

    return {
      totalPatients,
      totalDoctors,
      totalAppointments,
      totalDepartments,
      totalMedicalRecords,
      totalPrescriptions,
      totalBills,
      pendingBills,
      totalRevenue: revenue[0]?.total ?? 0,
    };
  }

  async getDoctorDashboard(
    doctorId: string,
  ) {
    const [
      totalAppointments,
      completedAppointments,
      upcomingAppointments,
      cancelledAppointments,
    ] = await Promise.all([
      this.appointmentModel.countDocuments({
        doctorId,
      }),
      this.appointmentModel.countDocuments({
        doctorId,
        status: 'completed',
      }),
      this.appointmentModel.countDocuments({
        doctorId,
        status: {
          $in: ['scheduled', 'confirmed'],
        },
      }),
      this.appointmentModel.countDocuments({
        doctorId,
        status: 'cancelled',
      }),
    ]);

    return {
      totalAppointments,
      completedAppointments,
      upcomingAppointments,
      cancelledAppointments,
    };
  }

  async getPatientDashboard(
    patientId: string,
  ) {
    const [
      upcomingAppointments,
      medicalRecords,
      prescriptions,
      totalBills,
      pendingBills,
    ] = await Promise.all([
      this.appointmentModel.countDocuments({
        patientId,
        status: {
          $in: ['scheduled', 'confirmed'],
        },
      }),
      this.medicalRecordModel.countDocuments({
        patientId,
      }),
      this.prescriptionModel.countDocuments({
        patientId,
      }),
      this.billingModel.countDocuments({
        patientId,
      }),
      this.billingModel.countDocuments({
        patientId,
        paymentStatus: PaymentStatus.PENDING,
      }),
    ]);

    return {
      upcomingAppointments,
      medicalRecords,
      prescriptions,
      totalBills,
      pendingBills,
    };
  }
}