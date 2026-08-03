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

import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientService } from './patient.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/schema/user.schema';

@ApiTags('Patients')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('patients')
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
  ) {}

  @Version('1')
  @Roles(UserRole.ADMIN)
  @Post()
  @ApiCreatedResponse({
    description: 'Patient created successfully',
  })
  async create(
    @Body() dto: CreatePatientDto,
  ) {
    return this.patientService.create(dto);
  }

  @Version('1')
  @Get()
  @ApiOkResponse({
    description: 'Get all patients',
  })
  async findAll() {
    return this.patientService.findAll();
  }

  @Version('1')
  @Get(':id')
  @ApiOkResponse({
    description: 'Get patient by ID',
  })
  async findOne(
    @Param('id') id: string,
  ) {
    return this.patientService.findOne(id);
  }

  @Version('1')
  @Patch(':id')
  @ApiOkResponse({
    description: 'Update patient',
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePatientDto,
  ) {
    return this.patientService.update(id, dto);
  }

  @Version('1')
  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete patient',
  })
  async remove(
    @Param('id') id: string,
  ) {
    return this.patientService.remove(id);
  }
}