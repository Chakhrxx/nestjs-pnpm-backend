import { Module } from '@nestjs/common';
import { TokenController } from './jwttoken.controller';

@Module({})
export class JwttokenModule {
  controllers: [TokenController];
}
