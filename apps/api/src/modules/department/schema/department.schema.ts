import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DepartmentDocument = Department & Document;

@Schema({
  timestamps: true,
})
export class Department {
  @Prop({
    required: true,
    trim: true,
    unique: true,
  })
  name!: string;

  @Prop({
    required: true,
    trim: true,
  })
  description!: string;

  @Prop({
    default: true,
  })
  isActive!: boolean;
}

export const DepartmentSchema =
  SchemaFactory.createForClass(Department);