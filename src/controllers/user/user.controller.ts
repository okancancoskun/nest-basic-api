import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { UserService } from "./user.service"
import {updateUserDto, UserDto} from "../../dtos";
import { UserSchema,User } from 'src/models/userSchema';

@Controller('user')
export class UserController {
    constructor(private UserService: UserService) { }
    
    @Post('/register')
    async register(@Body() body:UserDto):Promise<User>{
        return await this.UserService.createUser(body);
    }
    @Post('/login')
    async login(@Body() body:UserDto):Promise<any>{
        return await this.UserService.userLogin(body);
    }
    @Put('/update/:id')
    async updateUser(@Param('id') id:string,@Body() body:updateUserDto):Promise<User>{
        return await this.UserService.updateUser(id,body);
    }
}
