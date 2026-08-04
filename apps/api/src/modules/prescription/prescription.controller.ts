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

import { PrescriptionService } from './prescription.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/schema/user.schema';

@ApiTags('Prescriptions')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('prescriptions')
export class PrescriptionController {
  constructor(
    private readonly prescriptionService: PrescriptionService,
  ) {}

  @Version('1')
  @Roles(
    UserRole.ADMIN,
    UserRole.DOCTOR,
  )
  @Post()
  @ApiCreatedResponse({
    description: 'Prescription created successfully',
  })
  create(
    @Body() dto: CreatePrescriptionDto,
  ) {
    return this.prescriptionService.create(dto);
  }

  @Version('1')
  @Roles(
    UserRole.ADMIN,
    UserRole.DOCTOR,
    UserRole.PATIENT,
  )
  @Get()
  @ApiOkResponse({
    description: 'Get all prescriptions',
  })
  findAll() {
    return this.prescriptionService.findAll();
  }

  @Version('1')
  @Roles(
    UserRole.ADMIN,
    UserRole.DOCTOR,
    UserRole.PATIENT,
  )
  @Get(':id')
  @ApiOkResponse({
    description: 'Get prescription by ID',
  })
  findOne(
    @Param('id') id: string,
  ) {
    return this.prescriptionService.findOne(id);
  }

  @Version('1')
  @Roles(
    UserRole.ADMIN,
    UserRole.DOCTOR,
  )
  @Patch(':id')
  @ApiOkResponse({
    description: 'Update prescription',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePrescriptionDto,
  ) {
    return this.prescriptionService.update(id, dto);
  }

  @Version('1')
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete prescription',
  })
  remove(
    @Param('id') id: string,
  ) {
    return this.prescriptionService.remove(id);
  }
}