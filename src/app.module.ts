import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import appConfig from './config/app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
// import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';
// import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   load: [appConfig],
    //   validationSchema: Joi.object({
    //     environment: Joi.string().allow('development', 'production', 'test'),
    //     port: Joi.number().default(3000),
    //     database: Joi.object({
    //       type: Joi.string().required(),
    //       host: Joi.string().required(),
    //       port: Joi.number().required().default(5432),
    //       username: Joi.string().required(),
    //       password: Joi.string().required(),
    //       database: Joi.string().required(),
    //     }),
    //     migrationSettings: Joi.object({
    //       entities: Joi.array().items(Joi.string()),
    //       migrations: Joi.array().items(Joi.string()),
    //     }),
    //   }),
    //   isGlobal: true,
    // }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest-course'),
    CoffeesModule,
    // CoffeeRatingModule,
    DatabaseModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
