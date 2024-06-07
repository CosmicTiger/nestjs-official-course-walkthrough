import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto, UpdateCoffeeDto } from './dto/coffee.dto/coffee.dto';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: number) {
    return this.coffees.find((item) => item.id === +id);
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const newIndex = this.coffees.length + 1;
    this.coffees.push({
      id: newIndex,
      ...createCoffeeDto,
    });
    return createCoffeeDto;
  }

  update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      // update the existing entity
      this.coffees.map((item) => {
        if (item.id === +id) {
          item = {
            ...item,
            ...updateCoffeeDto,
          };
        }
      });
    }
  }

  remove(id: number) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
