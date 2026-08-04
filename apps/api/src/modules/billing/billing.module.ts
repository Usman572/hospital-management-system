import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Billing,
  BillingSchema,
} from './schema/billing.schema';

import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Billing.name,
        schema: BillingSchema,
      },
    ]),
  ],
  controllers: [
    BillingController,
  ],
  providers: [
    BillingService,
  ],
})
export class BillingModule {}