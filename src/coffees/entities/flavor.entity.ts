// import { v4 as uuidv4 } from 'uuid';
// import { Coffee } from './coffee.entity';

// @Schema()
// export class Flavor extends Document {
//   @Column()
//   name: string;

//   @Column({ default: uuidv4(), nullable: false })
//   slug: string;

//   @Column({ nullable: true })
//   brand: string;

//   @Column('boolean', { default: true, name: 'is_active' })
//   is_active: boolean;

//   @Prop((type) => Coffee, (coffee) => coffee.flavors)
//   coffees: Coffee[];
// }

// export const FlavorSchema = SchemaFactory.createForClass(Flavor);
