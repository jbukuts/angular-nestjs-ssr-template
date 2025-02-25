import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppMiddleware } from './app.middleware';
import { ApiModule } from './api/api.module';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';

@Module({
  imports: [
    ApiModule,
    RouterModule.register([{ path: 'api', module: ApiModule }])
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleware).forRoutes('*');
  }
}
