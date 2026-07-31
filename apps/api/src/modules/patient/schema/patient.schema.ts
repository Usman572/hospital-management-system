import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PatientDocument = Patient & Document;

@Schema({
  timestamps: true,
})
export class Patient {

  @Prop({
    required: true,
    trim: true,
  })
  fullName!: string;


  @Prop({
    required: true,
    min: 0,
  })
  age!: number;


  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email!: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);