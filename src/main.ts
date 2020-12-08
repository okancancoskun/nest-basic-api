import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from "./libs/filters/all-exception.filter";
/* import { Roles } from './libs/guards/auth.guard'; */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
/*   const reflector = app.get<Reflector>(Reflector);
  app.useGlobalGuards(new Roles(reflector)); */
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  await app.listen(3000);
}
bootstrap();
