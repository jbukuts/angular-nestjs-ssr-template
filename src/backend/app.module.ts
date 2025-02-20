import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppMiddleware } from './app.middleware';
import { ApiController } from './app.controller';
import { RenderController } from './render.controller';

@Module({
  imports: [],
  controllers: [ApiController, RenderController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(AppMiddleware).forRoutes('*')
  }
}
