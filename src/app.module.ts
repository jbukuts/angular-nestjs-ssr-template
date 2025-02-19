import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SsrMiddleware } from './ssr.middleware';
import { ApiController } from './backend/api.controller';

@Module({
  imports: [],
  controllers: [ApiController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(SsrMiddleware).forRoutes('*')
  }
}
