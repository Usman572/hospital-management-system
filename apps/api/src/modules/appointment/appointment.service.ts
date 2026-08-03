import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Appointment,
  AppointmentDocument,
} from './schema/appointment.schema';

import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { UpdateAppointmentStatusDto } from './dto/update-appointment-status.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<AppointmentDocument>,
  ) {}

  async create(
    dto: CreateAppointmentDto,
  ) {
    const appointment =
      new this.appointmentModel(dto);

    return appointment.save();
  }

  async findAll() {
    return this.appointmentModel
      .find()
      .populate('patientId')
      .exec();
  }

  async findOne(
    id: string,
  ) {
    return this.appointmentModel
      .findById(id)
      .populate('patientId')
      .exec();
  }

  async update(
    id: string,
    dto: UpdateAppointmentDto,
  ) {
    return this.appointmentModel
      .findByIdAndUpdate(
        id,
        dto,
        {
          new: true,
          runValidators: true,
        },
      )
      .exec();
  }

  async updateStatus(
    id: string,
    dto: UpdateAppointmentStatusDto,
  ) {
    return this.appointmentModel
      .findByIdAndUpdate(
        id,
        {
          status: dto.status,
        },
        {
          new: true,
          runValidators: true,
        },
      )
      .exec();
  }

  async remove(
    id: string,
  ) {
    return this.appointmentModel
      .findByIdAndDelete(id)
      .exec();
  }
}