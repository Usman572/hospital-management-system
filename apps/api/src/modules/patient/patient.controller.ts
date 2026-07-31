import { Body, Controller, Get, Param, Post, Version } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientService } from './patient.service';

@ApiTags('Patients')
@Controller('patients')
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
  ) {}

  @Version('1')
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
}