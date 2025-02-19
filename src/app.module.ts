import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SsrMiddleware } from './ssr.middleware';
import { ApiController } from './backend/backend.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const serverDistFolder = resolve(dirname(fileURLToPath(import.meta.url)), '../');
const browserDistFolder = resolve(serverDistFolder, 'browser');

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: browserDistFolder
  })],
  controllers: [ApiController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(SsrMiddleware).forRoutes('*')
  }
}
