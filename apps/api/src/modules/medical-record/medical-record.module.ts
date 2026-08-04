import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  MedicalRecord,
  MedicalRecordSchema,
} from './schema/medical-record.schema';

import { MedicalRecordController } from './medical-record.controller';
import { MedicalRecordService } from './medical-record.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MedicalRecord.name,
        schema: MedicalRecordSchema,
      },
    ]),
  ],
  controllers: [
    MedicalRecordController,
  ],
  providers: [
    MedicalRecordService,
  ],
})
export class MedicalRecordModule {}