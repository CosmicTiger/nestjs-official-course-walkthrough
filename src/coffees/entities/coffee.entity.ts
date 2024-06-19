import { v4 as uuidv4 } from 'uuid';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { Flavor } from './flavor.entity';

@Schema()
export class Coffee extends Document {
  @Prop({ default: uuidv4(), nullable: false })
  slug: string;

  @Prop([String])
  name: string;

  @Prop([String])
  description: string;

  @Prop([String])
  brand: string;

  @Prop([Boolean])
  is_active: boolean;

  @Prop({ default: 0 })
  recommendations: number;

  @Prop([String])
  flavors: string[];
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flavor' }] })
  // flavors: Flavor[];
}

export const CoffeeSchema = SchemaFactory.createForClass(Coffee);
