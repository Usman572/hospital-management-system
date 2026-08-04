import {
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreatePrescriptionDto {
  @IsMongoId()
  @IsNotEmpty()
  patientId!: string;

  @IsMongoId()
  @IsNotEmpty()
  doctorId!: string;

  @IsMongoId()
  @IsNotEmpty()
  medicalRecordId!: string;

  @IsString()
  @IsNotEmpty()
  medicineName!: string;

  @IsString()
  @IsNotEmpty()
  dosage!: string;

  @IsString()
  @IsNotEmpty()
  duration!: string;

  @IsString()
  @IsNotEmpty()
  instructions!: string;
}