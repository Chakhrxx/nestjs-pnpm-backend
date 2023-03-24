import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { User, UserDocument } from '../models/user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
// Load the environment variables from the .env file
dotenv.config();

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_KEY) as {
          userId: string;
        };

        const userData = JSON.parse(
          atob(String(authHeader.split('.')[1])),
        )?._doc;
        const user = await this.userModel.findById(userData?._id);
        if (!user) {
          return res.status(401).json({ message: 'User not found' });
        }

        req['user'] = decoded;
        next();
      } catch (err) {
        res.status(401).json({ message: 'Invalid token', error: err });
      }
    } else {
      res.status(401).json({ message: 'Authentication failed' });
    }
  }
}

@Injectable()
export class checkRoleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = req.headers.authorization?.split('.')[1];
      try {
        const decoded = JSON.parse(atob(String(token)))?._doc;
        if (decoded.role === 'admin') {
          next();
        } else {
          return res.status(403).json({ message: 'Forbidden' });
        }
      } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
      }
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
