import { Module,NestModule,MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose"
import environment from "./environment" ;
import {ProductController} from "./controllers/product/product.controller";
import {LoggedIn} from "./middlewares/index"
import {ProductModule,UserModule} from "./controllers"
import { UserController } from './controllers/user/user.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './libs/guards/roles.guard';


@Module({
  imports: [MongooseModule.forRoot(environment.mongoUrl),ProductModule,UserModule],
  controllers: [AppController,UserController],
  providers: [AppService,{
    provide:APP_GUARD,
    useClass:RolesGuard
  }],
})
export class AppModule {
/*   configure(consumer:MiddlewareConsumer){
    consumer
      .apply(LoggedIn)
      .forRoutes(ProductController);
  } */
}
