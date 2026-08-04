import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  MedicalRecord,
  MedicalRecordDocument,
} from './schema/medical-record.schema';

import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';

@Injectable()
export class MedicalRecordService {
  constructor(
    @InjectModel(MedicalRecord.name)
    private readonly medicalRecordModel: Model<MedicalRecordDocument>,
  ) {}

  async create(
    dto: CreateMedicalRecordDto,
  ) {
    const record =
      new this.medicalRecordModel(dto);

    return record.save();
  }

  async findAll() {
    return this.medicalRecordModel
      .find()
      .populate('patientId')
      .populate('doctorId')
      .exec();
  }

  async findOne(
    id: string,
  ) {
    return this.medicalRecordModel
      .findById(id)
      .populate('patientId')
      .populate('doctorId')
      .exec();
  }

  async update(
    id: string,
    dto: UpdateMedicalRecordDto,
  ) {
    return this.medicalRecordModel
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
    return this.medicalRecordModel
      .findByIdAndDelete(id)
      .exec();
  }
}