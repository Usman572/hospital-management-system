import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';

import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { BillingService } from './billing.service';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/schema/user.schema';

@ApiTags('Billing')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('billing')
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
  ) {}

  @Version('1')
  @Roles(
    UserRole.ADMIN,
    UserRole.DOCTOR,
  )
  @Post()
  @ApiCreatedResponse({
    description: 'Billing created successfully',
  })
  create(
    @Body() dto: CreateBillingDto,
  ) {
    return this.billingService.create(dto);
  }

  @Version('1')
  @Roles(
    UserRole.ADMIN,
    UserRole.DOCTOR,
    UserRole.PATIENT,
  )
  @Get()
  @ApiOkResponse({
    description: 'Get all billing records',
  })
  findAll() {
    return this.billingService.findAll();
  }

  @Version('1')
  @Roles(
    UserRole.ADMIN,
    UserRole.DOCTOR,
    UserRole.PATIENT,
  )
  @Get(':id')
  @ApiOkResponse({
    description: 'Get billing by ID',
  })
  findOne(
    @Param('id') id: string,
  ) {
    return this.billingService.findOne(id);
  }

  @Version('1')
  @Roles(
    UserRole.ADMIN,
  )
  @Patch(':id')
  @ApiOkResponse({
    description: 'Update billing',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateBillingDto,
  ) {
    return this.billingService.update(id, dto);
  }

  @Version('1')
  @Roles(
    UserRole.ADMIN,
  )
  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete billing',
  })
  remove(
    @Param('id') id: string,
  ) {
    return this.billingService.remove(id);
  }
}