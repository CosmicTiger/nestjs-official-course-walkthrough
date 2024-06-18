import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeRatingService } from './coffee-rating.service';
import { CoffeesService } from '../coffees/coffees.service';

describe('CoffeeRatingService', () => {
  let service: CoffeeRatingService;
  let mockCoffeeService: Partial<CoffeesService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeeRatingService,
        {
          provide: CoffeesService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CoffeeRatingService>(CoffeeRatingService);
    mockCoffeeService = module.get<CoffeesService>(CoffeesService);
  });

  it('should be defined', () => {
    expect(mockCoffeeService).toBeDefined();
    expect(service).toBeDefined();
  });
});
