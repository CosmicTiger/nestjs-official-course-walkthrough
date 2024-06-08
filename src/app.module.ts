import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: Joi.object({
        environment: Joi.string().allow('development', 'production', 'test'),
        port: Joi.number().default(3000),
        database: Joi.object({
          type: Joi.string().required(),
          host: Joi.string().required(),
          port: Joi.number().required().default(5432),
          username: Joi.string().required(),
          password: Joi.string().required(),
          database: Joi.string().required(),
        }),
        migrationSettings: Joi.object({
          entities: Joi.array().items(Joi.string()),
          migrations: Joi.array().items(Joi.string()),
        }),
      }),
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get<{
          type: 'postgres';
          host: string;
          port: number;
          username: string;
          password: string;
          database: string;
          autoLoadEntities: boolean;
          synchronize: boolean;
        }>('database.configs'),
    }),
    CoffeesModule,
    CoffeeRatingModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
