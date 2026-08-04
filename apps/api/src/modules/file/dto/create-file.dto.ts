import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
} from 'class-validator';

import { FileType } from '../schema/file.schema';

export class CreateFileDto {
  @IsMongoId()
  @IsNotEmpty()
  patientId!: string;

  @IsEnum(FileType)
  type!: FileType;
}