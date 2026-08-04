import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsMongoId()
  @IsNotEmpty()
  patientId!: string;

  @IsMongoId()
  @IsNotEmpty()
  doctorId!: string;

  @IsDateString(
    {},
    {
      message:
        'appointmentDate must be a valid ISO 8601 date string',
    },
  )
  @IsNotEmpty()
  appointmentDate!: string;

  @IsString()
  @IsNotEmpty()
  reason!: string;
}