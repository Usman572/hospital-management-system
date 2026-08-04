import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMedicalRecordDto {
  @IsMongoId()
  @IsNotEmpty()
  patientId!: string;

  @IsMongoId()
  @IsNotEmpty()
  doctorId!: string;

  @IsString()
  @IsNotEmpty()
  diagnosis!: string;

  @IsString()
  @IsNotEmpty()
  symptoms!: string;

  @IsString()
  @IsNotEmpty()
  prescription!: string;

  @IsString()
  @IsOptional()
  notes?: string;
}