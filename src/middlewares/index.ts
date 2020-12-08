import { HttpException, HttpStatus, Injectable, NestMiddleware,Request,Response } from "@nestjs/common";
/* import { Request, Response, NextFunction } from "express"; */
import * as jwt from "jsonwebtoken";

@Injectable()
export class LoggedIn implements NestMiddleware {
    use(@Request() req, @Response() res, next: Function) {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            const user = jwt.verify(token, "a3bfbcb32865dfed02e80fc2abd56f9d9935b29e251f008c73c20efbc32ec25b9aa8b0c442bdc28a9c79c06e773b1cdbb5fa1fdf203484e4f83bc273c73974c7")
            req.user = user;  
        }
        else{
            throw new HttpException('Error',HttpStatus.FORBIDDEN);
        }
        next();
    }
}