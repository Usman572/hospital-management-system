import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Department,
  DepartmentDocument,
} from './schema/department.schema';

import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name)
    private readonly departmentModel: Model<DepartmentDocument>,
  ) {}

  async create(
    dto: CreateDepartmentDto,
  ) {
    const department =
      new this.departmentModel(dto);

    return department.save();
  }

  async findAll() {
    return this.departmentModel
      .find()
      .exec();
  }

  async findOne(
    id: string,
  ) {
    return this.departmentModel
      .findById(id)
      .exec();
  }

  async update(
    id: string,
    dto: UpdateDepartmentDto,
  ) {
    return this.departmentModel
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
    return this.departmentModel
      .findByIdAndDelete(id)
      .exec();
  }
}