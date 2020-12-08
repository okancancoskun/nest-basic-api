import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from "bcrypt";
import { UserSchema,User } from 'src/models/userSchema';
import * as jwt from "jsonwebtoken";
import {Model} from "mongoose";
import {updateUserDto, UserDto} from "../../dtos";

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userMongo:Model<User>,
    ){}
    async createUser(user:UserDto):Promise<User>{
        const isUserExist = await this.userMongo.findOne({email:user.email});
        if(!isUserExist){
            const newUser = new this.userMongo(user);
            return await newUser.save();
        }
        else{
            throw new HttpException('User Already Exist',HttpStatus.BAD_REQUEST);
        }
    }
    async userLogin(user:UserDto):Promise<any>{
        const isUserExist = await this.userMongo.findOne({email:user.email});
        if(isUserExist){
            const isSuccess = bcrypt.compare(user.password,isUserExist.password);
            const {_id,email,role}=isUserExist;
            if(isSuccess){
                const token = await jwt.sign({_id:_id,email:email,role:role},"a3bfbcb32865dfed02e80fc2abd56f9d9935b29e251f008c73c20efbc32ec25b9aa8b0c442bdc28a9c79c06e773b1cdbb5fa1fdf203484e4f83bc273c73974c7",{expiresIn:'1d'});
                return{
                    token,
                    user:{_id,email,role}
                }
            }
            else{
                throw new HttpException('Error',HttpStatus.FORBIDDEN)
            }
        }else{
            throw new HttpException('Error',HttpStatus.BAD_REQUEST);
        }
    }
    async findUser(id:string):Promise<User>{
        return await this.userMongo.findById(id).populate('role');
    }
    async updateUser(id:string,userDto:updateUserDto):Promise<User>{
        let updatedUser = this.userMongo.findOne({_id:id}).exec();
        updatedUser = {...updatedUser, ...userDto};
        return await this.userMongo.findByIdAndUpdate(id,updatedUser,{new:true}).exec();
    }
}
