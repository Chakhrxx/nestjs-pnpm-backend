import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export type UserDocument = User & Document;

@Schema()
export class User {
  @IsString()
  @ApiProperty({ example: 'John Doe' })
  @Prop({ required: true })
  name: string;

  @IsString()
  @ApiProperty({ example: 'password123' })
  @Prop({ required: true })
  password: string;

  @IsEmail()
  @ApiProperty({ example: 'john.doe@example.com' })
  @Prop({
    required: true,
    match: [/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, 'Invalid email'],
  })
  email: string;

  @IsString()
  @ApiProperty({ example: 'guest' })
  @Prop({
    type: String,
    enum: ['admin', 'user', 'guest'],
    default: 'guest',
  })
  role: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
