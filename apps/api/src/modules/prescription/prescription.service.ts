import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Prescription,
  PrescriptionDocument,
} from './schema/prescription.schema';

import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectModel(Prescription.name)
    private readonly prescriptionModel: Model<PrescriptionDocument>,
  ) {}

  async create(
    dto: CreatePrescriptionDto,
  ) {
    const prescription =
      new this.prescriptionModel(dto);

    return prescription.save();
  }

  async findAll() {
    return this.prescriptionModel
      .find()
      .populate('patientId')
      .populate('doctorId')
      .populate('medicalRecordId')
      .exec();
  }

  async findOne(
    id: string,
  ) {
    return this.prescriptionModel
      .findById(id)
      .populate('patientId')
      .populate('doctorId')
      .populate('medicalRecordId')
      .exec();
  }

  async update(
    id: string,
    dto: UpdatePrescriptionDto,
  ) {
    return this.prescriptionModel
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

  async remove(
    id: string,
  ) {
    return this.prescriptionModel
      .findByIdAndDelete(id)
      .exec();
  }
}