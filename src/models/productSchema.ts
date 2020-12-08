import { Document, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { User } from "./userSchema";

@Schema()
export class Product extends Document {
    @Prop({}) title: string;
    @Prop({}) text: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);