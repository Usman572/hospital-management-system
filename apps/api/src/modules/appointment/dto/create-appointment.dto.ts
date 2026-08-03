import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsMongoId()
  patientId!: string;

  @IsString()
  @IsNotEmpty()
  doctorName!: string;

  @IsDateString()
  appointmentDate!: string;

  @IsString()
  @IsNotEmpty()
  reason!: string;
}