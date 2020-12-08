import {Types} from "mongoose"
export default interface updateUserDto{
    email:string;
    password:string;
    role:Types.ObjectId;
}