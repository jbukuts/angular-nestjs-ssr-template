import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { isMainModule } from '@angular/ssr/node';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { NestExpressApplication } from '@nestjs/platform-express';

const serverDistFolder = resolve(dirname(fileURLToPath(import.meta.url)), '../');
const browserDistFolder = resolve(serverDistFolder, 'browser');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(browserDistFolder)
  await app.listen(3000);
}

if (isMainModule(import.meta.url)) {
  bootstrap();
}

