import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'The name of a coffee.' })
  @IsString()
  readonly name: string;
  @ApiProperty({ description: 'The brand of a coffee.' })
  @IsString()
  readonly brand: string;
  @IsString({ each: true })
  @ApiProperty({ description: 'The flavors of a coffee.' })
  readonly flavors: string[];
}

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
