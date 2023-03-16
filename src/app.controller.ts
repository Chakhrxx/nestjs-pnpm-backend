import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findAll(@Res() res: Response) {
    res.redirect('https://nestjs.com/');
  }
}
