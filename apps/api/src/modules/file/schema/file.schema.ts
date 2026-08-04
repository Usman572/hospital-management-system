import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type FileDocument = HydratedDocument<File>;

export enum FileType {
  REPORT = 'report',
  PRESCRIPTION = 'prescription',
  LAB_RESULT = 'lab_result',
  SCAN = 'scan',
  OTHER = 'other',
}

@Schema({
  timestamps: true,
})
export class File {
  @Prop({
    type: Types.ObjectId,
    ref: 'Patient',
    required: true,
  })
  patientId!: Types.ObjectId;

  @Prop({
    required: true,
    trim: true,
  })
  originalName!: string;

  @Prop({
    required: true,
    trim: true,
  })
  fileName!: string;

  @Prop({
    required: true,
    trim: true,
  })
  mimeType!: string;

  @Prop({
    required: true,
  })
  size!: number;

  @Prop({
    required: true,
    enum: FileType,
  })
  type!: FileType;

  @Prop({
    required: true,
    trim: true,
  })
  path!: string;
}

export const FileSchema =
  SchemaFactory.createForClass(File);