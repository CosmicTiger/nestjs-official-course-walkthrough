import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { CoffeesModule } from '../src/coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCoffeeDto } from 'src/coffees/dto/coffee.dto/coffee.dto';
import { Http2Server } from 'http2';

describe('[Feature] Coffees - /coffees', () => {
  let app: INestApplication;
  let httpServer: Http2Server;

  const coffee = {
    name: 'Shipwreck Roast',
    brand: 'Buddy Brew',
    flavors: ['chocolate', 'vanilla'],
  };

  const expectedPartialCoffee = expect.objectContaining({
    ...coffee,
    flavors: expect.arrayContaining(
      coffee.flavors.map((name) => expect.objectContaining({ name })),
    ),
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'pass123',
          database: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          retryAttempts: 5, // Number of retry attempts
          retryDelay: 3000, // Delay between retries (in milliseconds)
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('Create [POST /]', () => {
    return request(httpServer)
      .post('/coffees')
      .send(coffee as CreateCoffeeDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        expect(body).toEqual(expectedPartialCoffee);
      });
  });
  it('Get all [GET /]', () => {
    return request(httpServer)
      .get('/coffees')
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body.length).toBeGreaterThanOrEqual(1);
        const coffees = body as Array<any>;
        const coffee = coffees.find((c) => c.id);
        expect(coffee).toEqual(expectedPartialCoffee);
      });
  });
  it('Get one [GET /:id]', () => {
    return request(httpServer)
      .get('/coffees/1')
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body).toEqual(expectedPartialCoffee);
      });
  });
  it('Update one [PATCH /:id]', () => {
    const updateCoffeeDto = {
      ...coffee,
      name: 'New and Improved Shipwreck Roast',
    };
    return request(httpServer)
      .patch('/coffees/1')
      .send(updateCoffeeDto)
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body.name).toEqual(updateCoffeeDto.name);
      });
  });
  it('Delete one [DELETE /:id]', () => {
    return request(httpServer)
      .delete('/coffees/1')
      .expect(HttpStatus.OK)
      .then(() => {
        return request(httpServer)
          .get('/coffees/1')
          .expect(HttpStatus.NOT_FOUND);
      });
  });
});
