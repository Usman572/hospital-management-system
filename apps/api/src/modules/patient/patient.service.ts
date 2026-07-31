import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Patient, PatientDocument } from './schema/patient.schema';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {

  constructor(
    @InjectModel(Patient.name)
    private readonly patientModel: Model<PatientDocument>,
  ) {}

  async create(dto: CreatePatientDto) {
    const patient = new this.patientModel(dto);

    return patient.save();
  }

  async findAll() {
    return this.patientModel.find().exec();
  }

  async findOne(id: string) {
    return this.patientModel.findById(id).exec();
  }

  async update(
    id: string,
    dto: UpdatePatientDto,
  ) {
    return this.patientModel
      .findByIdAndUpdate(
        id,
        dto,
        {
          new: true,
        },
      )
      .exec();
  }

  async remove(id: string) {
    return this.patientModel
      .findByIdAndDelete(id)
      .exec();
  }
}