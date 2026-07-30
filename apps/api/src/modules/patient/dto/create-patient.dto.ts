import { IsEmail, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsNumber()
  @Min(0)
  age!: number;

  @IsEmail()
  email!: string;
}