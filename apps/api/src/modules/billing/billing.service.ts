import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Billing,
  BillingDocument,
} from './schema/billing.schema';

import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';

@Injectable()
export class BillingService {
  constructor(
    @InjectModel(Billing.name)
    private readonly billingModel: Model<BillingDocument>,
  ) {}

  async create(
    dto: CreateBillingDto,
  ) {
    const billing =
      new this.billingModel(dto);

    return billing.save();
  }

  async findAll() {
    return this.billingModel
      .find()
      .populate('patientId')
      .populate('appointmentId')
      .exec();
  }

  async findOne(
    id: string,
  ) {
    return this.billingModel
      .findById(id)
      .populate('patientId')
      .populate('appointmentId')
      .exec();
  }

  async update(
    id: string,
    dto: UpdateBillingDto,
  ) {
    return this.billingModel
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
    return this.billingModel
      .findByIdAndDelete(id)
      .exec();
  }
}