import { Module } from '@nestjs/common';
import {ProductController} from "./product.controller";
import {ProductService} from "./product.service";
import {MongooseModule} from "@nestjs/mongoose";
import { ProductSchema,Product } from 'src/models/productSchema';

@Module({
    imports:[MongooseModule.forFeature([
        {name:Product.name,schema:ProductSchema}
    ])],
    providers:[ProductService],
    controllers:[ProductController]
})
export class ProductModule {}
