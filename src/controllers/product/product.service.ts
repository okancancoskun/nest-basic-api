import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose";
import { ProductDto } from "../../dtos";
import { ProductSchema,Product } from 'src/models/productSchema';
import {User} from "src/models/userSchema";

@Injectable()
export class ProductService {
    constructor(
        @InjectModel('Product') private readonly productMongo: Model<Product>,
    ) { }
    async create(product: ProductDto): Promise<Product> {
        const newProduct = new this.productMongo(product);
        return await newProduct.save();
    }
    async findAll(): Promise<Product[]> {
        return await this.productMongo.find().exec();
    }
    async findOne(id: string): Promise<Product> {
        return await this.productMongo.findOne({ _id: id })
    }
    async deleteOne(id: string): Promise<Product> {
        const product = await this.productMongo.findById(id);
        return await product.remove();
    }
    async updateProduct(id:string,product:ProductDto):Promise<Product>{
        let updatedProduct = this.productMongo.findOne({_id:id}).exec();
        updatedProduct = {...updatedProduct,...product}
        return await this.productMongo.findByIdAndUpdate(id,updatedProduct,{new:true}).exec();
    }
}
