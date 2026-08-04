import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { join } from 'path';
import {
  existsSync,
  unlinkSync,
} from 'fs';

import {
  File,
  FileDocument,
} from './schema/file.schema';

import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(File.name)
    private readonly fileModel: Model<FileDocument>,
  ) {}

  async upload(
    dto: CreateFileDto,
    file: Express.Multer.File,
  ) {
    const document =
      new this.fileModel({
        patientId: dto.patientId,
        type: dto.type,
        originalName: file.originalname,
        fileName: file.filename,
        mimeType: file.mimetype,
        size: file.size,
        path: file.path,
      });

    return document.save();
  }

  async findAll() {
    return this.fileModel
      .find()
      .populate('patientId')
      .exec();
  }

  async findOne(id: string) {
    return this.fileModel
      .findById(id)
      .populate('patientId')
      .exec();
  }

  async download(id: string) {
    const file =
      await this.fileModel.findById(id);

    if (!file) {
      throw new NotFoundException(
        'File not found',
      );
    }

    const filePath = join(
      process.cwd(),
      file.path,
    );

    if (!existsSync(filePath)) {
      throw new NotFoundException(
        'Physical file not found',
      );
    }

    return {
      file,
      filePath,
    };
  }

  async remove(id: string) {
    const file =
      await this.fileModel.findById(id);

    if (!file) {
      throw new NotFoundException(
        'File not found',
      );
    }

    const filePath = join(
      process.cwd(),
      file.path,
    );

    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }

    await this.fileModel.findByIdAndDelete(id);

    return {
      message: 'File deleted successfully',
      id,
    };
  }
}