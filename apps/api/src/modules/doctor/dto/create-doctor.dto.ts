import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  specialization!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsMongoId()
  @IsNotEmpty()
  departmentId!: string;
}