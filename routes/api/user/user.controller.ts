import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Res,
  Next,
  Body,
  UseGuards,
} from '@nestjs/common';
import { User, UserDocument } from '../../../models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response, NextFunction } from 'express';
import { ApiTags, ApiSecurity, ApiBody, ApiParam } from '@nestjs/swagger';
import { JwtMiddleware } from '../../../middlewares/authentication.middleware';

@ApiTags('MongoDB')
@ApiSecurity('BearerAuth')
@Controller('/mongo/user')
@UseGuards(JwtMiddleware)
export class UserController {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  @Get()
  async findAll(@Res() res: Response, @Next() next: NextFunction) {
    this.userModel
      .find({})
      .select({ _id: 0, name: 1, email: 1 })
      .exec()
      .then((users: UserDocument[]) => {
        if (users?.length === 0) {
          return res.status(204).json({
            status: 'Failed',
            result: null,
            message: `No contens`,
          });
        } else {
          res.status(200).json({ status: 'Success', result: users });
        }
      })
      .catch((err: Error) => {
        next(err);
      });
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: '641873bc7e29bdf1ba9b4a80' })
  async findById(@Param('id') id: string, @Res() res: Response) {
    this.userModel
      .findById(id)
      .select({ _id: 0, name: 1, email: 1 })
      .exec()
      .then((user: UserDocument | null) => {
        res.status(200).json({ status: 'Success', result: user });
      })
      .catch((err: Error) => {
        return res.status(404).json({
          status: 'Failed',
          result: null,
          message: `User with id:${id} does not exists`,
        });
      });
  }

  @Post()
  @ApiBody({
    type: User,
  })
  async insertOne(@Body() userData: User, @Res() res: Response) {
    const newUser = new this.userModel({ ...userData });
    await newUser
      .save()
      .then((user: UserDocument) => {
        res.status(201).json({ status: 'Success', result: user });
      })
      .catch((err: Error) => {
        res.status(500).json({
          status: 'Failed',
          result: null,
          message: err?.message,
        });
      });
  }

  @Put(':id')
  @ApiParam({ name: 'id', example: '641873bc7e29bdf1ba9b4a80' })
  @ApiBody({
    type: User,
  })
  async findByIdAndUpdate(
    @Param('id') id: string,
    @Res() res: Response,
    @Body() userData: User,
  ) {
    this.userModel
      .findByIdAndUpdate(id, userData, { new: true })
      .exec()
      .then((updatedUser: UserDocument | null) => {
        res.status(200).json({ status: 'Success', result: updatedUser });
      })
      .catch((err: Error) => {
        res.status(500).json({
          status: 'Failed',
          result: null,
          message: err?.message,
        });
      });
  }

  @Delete(':id')
  @ApiParam({ name: 'id', example: '641873bc7e29bdf1ba9b4a80' })
  async findByIdAndDelete(@Param('id') id: string, @Res() res: Response) {
    this.userModel
      .findByIdAndDelete(id)
      .select({ _id: 0, name: 1, email: 1 })
      .exec()
      .then((deletedUser: UserDocument | null) => {
        res.status(200).json({ status: 'Success', result: deletedUser });
      })
      .catch((err: Error) => {
        res.json({
          status: 'Failed',
          result: null,
          message: err?.message,
        });
      });
  }
}
