import { Controller, Get, Post, Body, Param, Delete, Request, UseGuards, Put } from '@nestjs/common';
import { ProductService } from "./product.service"
import { ProductDto } from "../../dtos";
import { Product } from 'src/models/productSchema';
import { Roles } from "src/decorators/role.decorator";


@Controller('product')

export class ProductController {
    constructor(private productService: ProductService) { }
    @Get()
    async getAll(): Promise<Product[]> {
        return await this.productService.findAll();
    }

    @Post('/add-product')
    async create(@Body() body: ProductDto, @Request() req): Promise<Product> {
        return await this.productService.create(body);
    }
    @Get(':id')
    async getPostDetail(@Param() params): Promise<Product> {
        return await this.productService.findOne(params.id);
    }
    @Delete('/delete-product/:id')
    async deleteOne(@Param() params): Promise<Product> {
        return await this.productService.deleteOne(params.id);
    }
    @Put('/update/:id')
    async updateOne(@Param() param,@Body() body:ProductDto):Promise<Product>{
        return await this.productService.updateProduct(param.id,body);
    }
}
