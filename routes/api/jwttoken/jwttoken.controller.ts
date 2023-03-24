import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import * as jwt from 'jsonwebtoken';
import { User, UserDocument } from '../../../model/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as dotenv from 'dotenv';
// Load the environment variables from the .env file
dotenv.config();

@ApiTags('Authentication')
@ApiBearerAuth()
@Controller()
export class TokenController {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  @ApiOperation({ summary: 'Create token by ID' })
  @ApiResponse({ status: 200, description: 'JWT token successfully created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get('createToken/:id')
  @ApiParam({ name: 'id', example: '641873bc7e29bdf1ba9b4a80' })
  createToken(@Param('id') id: string, @Res() res: Response) {
    this.userModel
      .findById(id)
      .select({ _id: 1, name: 1, email: 1, role: 1 })
      .exec()
      .then((user: UserDocument | null) => {
        if (!user) {
          return res.status(404).json({
            status: 'Failed',
            result: null,
            message: `User with id:${id} does not exists`,
          });
        } else {
          const token = jwt.sign({ ...user }, process.env.JWT_KEY, {
            expiresIn: '1h',
          });

          res.status(200).send(token);
        }
      })
      .catch((err: Error) => {
        return res.status(404).json({
          status: 'Failed',
          result: null,
          message: `User with id:${id} does not exists`,
        });
      });
  }
}
