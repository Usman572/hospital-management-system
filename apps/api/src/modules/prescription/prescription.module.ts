import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Prescription,
  PrescriptionSchema,
} from './schema/prescription.schema';

import { PrescriptionController } from './prescription.controller';
import { PrescriptionService } from './prescription.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Prescription.name,
        schema: PrescriptionSchema,
      },
    ]),
  ],
  controllers: [
    PrescriptionController,
  ],
  providers: [
    PrescriptionService,
  ],
})
export class PrescriptionModule {}