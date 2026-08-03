import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  RECEPTIONIST = 'receptionist',
  PATIENT = 'patient',
}

@Schema({
  timestamps: true,
})
export class User {

  @Prop({
    required: true,
    trim: true,
  })
  name!: string;


  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email!: string;


  @Prop({
    required: true,
  })
  password!: string;


  @Prop({
    enum: UserRole,
    default: UserRole.PATIENT,
  })
  role!: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);