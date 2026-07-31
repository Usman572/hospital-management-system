import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({
    example: 'Usman Ali',
    description: 'Patient full name',
  })
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @ApiProperty({
    example: 25,
    description: 'Patient age',
  })
  @IsNumber()
  @Min(0)
  age!: number;

  @ApiProperty({
    example: 'usman@example.com',
    description: 'Patient email address',
  })
  @IsEmail()
  email!: string;
}