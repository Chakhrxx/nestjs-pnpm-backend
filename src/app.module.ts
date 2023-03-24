import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../models/user.model';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from '../routes/api/user/user.controller';
import { UserModule } from '../routes/api/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';
import { TokenController } from '../routes/api/jwttoken/jwttoken.controller';
import { JwttokenModule } from '../routes/api/jwttoken/jwttoken.module';
import {
  JwtMiddleware,
  checkRoleMiddleware,
} from '../middlewares/authentication.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongoURI'),
        ...configService.get<object>('mongoOption'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwttokenModule,
    UserModule,
  ],
  controllers: [AppController, TokenController, UserController],
  providers: [AppService, JwtMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('/mongo/*');
    consumer
      .apply(checkRoleMiddleware)
      .forRoutes(
        { path: '/mongo/*', method: RequestMethod.PUT },
        { path: '/mongo/*', method: RequestMethod.DELETE },
      );
  }
}
