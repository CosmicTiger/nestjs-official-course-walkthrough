import { v4 as uuidv4 } from 'uuid';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Coffee } from './coffee.entity';

@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: uuidv4(), nullable: false })
  slug: string;

  @Column({ nullable: true })
  brand: string;

  @Column('boolean', { default: true, name: 'is_active' })
  is_active: boolean;

  @ManyToMany((type) => Coffee, (coffee) => coffee.flavors)
  coffees: Coffee[];
}
