import { Body, Controller, Post, Version } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';

@Controller('patients')
export class PatientController {
  @Version('1')
  @Post()
  create(@Body() dto: CreatePatientDto) {
    return {
      success: true,
      message: 'Patient validated successfully',
      data: dto,
    };
  }
}