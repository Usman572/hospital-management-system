import { Body, Controller, Post } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';

@Controller('patients')
export class PatientController {
  @Post()
  create(@Body() dto: CreatePatientDto) {
    return {
      success: true,
      message: 'Patient validated successfully',
      data: dto,
    };
  }
}