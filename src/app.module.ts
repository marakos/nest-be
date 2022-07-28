import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LoginModule } from './user/user.module';

import HealthModule from './health/health.module';
import * as Joi from '@hapi/joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import LogsMiddleware from './utils/logs.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
// import configuration from './common/env';
@Module({
  imports: [
    // ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_URI: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASS: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService
            .get('DB_URI')
            .slice(0, -1)
            .replace(/[''']+/g, ''),
        };
      },
    }),
    LoginModule,
    AuthModule,
    UsersModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
