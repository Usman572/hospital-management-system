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

import { MedicalRecordService } from './medical-record.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/schema/user.schema';

@ApiTags('Medical Records')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('medical-records')
export class MedicalRecordController {
  constructor(
    private readonly medicalRecordService: MedicalRecordService,
  ) {}

  @Version('1')
  @Roles(
    UserRole.ADMIN,
    UserRole.DOCTOR,
  )
  @Post()
  @ApiCreatedResponse({
    description: 'Medical record created successfully',
  })
  create(
    @Body() dto: CreateMedicalRecordDto,
  ) {
    return this.medicalRecordService.create(dto);
  }

  @Version('1')
  @Roles(
    UserRole.ADMIN,
    UserRole.DOCTOR,
  )
  @Get()
  @ApiOkResponse({
    description: 'Get all medical records',
  })
  findAll() {
    return this.medicalRecordService.findAll();
  }

  @Version('1')
  @Roles(
    UserRole.ADMIN,
    UserRole.DOCTOR,
  )
  @Get(':id')
  @ApiOkResponse({
    description: 'Get medical record by ID',
  })
  findOne(
    @Param('id') id: string,
  ) {
    return this.medicalRecordService.findOne(id);
  }

  @Version('1')
  @Roles(
    UserRole.ADMIN,
    UserRole.DOCTOR,
  )
  @Patch(':id')
  @ApiOkResponse({
    description: 'Update medical record',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateMedicalRecordDto,
  ) {
    return this.medicalRecordService.update(id, dto);
  }

  @Version('1')
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete medical record',
  })
  remove(
    @Param('id') id: string,
  ) {
    return this.medicalRecordService.remove(id);
  }
}