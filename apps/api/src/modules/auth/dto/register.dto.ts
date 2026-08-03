import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {

  @ApiProperty({
    example: 'Usman Ali',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;


  @ApiProperty({
    example: 'usman@example.com',
  })
  @IsEmail()
  email!: string;


  @ApiProperty({
    example: 'password123',
  })
  @IsString()
  @MinLength(6)
  password!: string;
}