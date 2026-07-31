import { Body, Controller, Post, Version } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreatePatientDto } from './dto/create-patient.dto';

@ApiTags('Patients')
@Controller('patients')
export class PatientController {
  @Version('1')
  @Post()
  @ApiCreatedResponse({
    description: 'Patient created successfully',
  })
  create(@Body() dto: CreatePatientDto) {
    return {
      success: true,
      message: 'Patient validated successfully',
      data: dto,
    };
  }
}