/// <reference types="vite/client" />

import { NestFactory } from '@nestjs/core';
import { AppModule } from './backend/app.module';
import { createNodeRequestHandler } from '@angular/ssr/node';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

const port = process.env['PORT'] ?? 5000;
const isDev = process.env['NODE_ENV'] === 'development';
const serverDistFolder = resolve(dirname(fileURLToPath(import.meta.url)), '../');
const browserDistFolder = resolve(serverDistFolder, 'browser');

const app = await NestFactory.create<NestExpressApplication>(AppModule);
app.useStaticAssets(browserDistFolder);
app.enableShutdownHooks();
app.useGlobalPipes(new ValidationPipe())
await (isDev ? app.init() : app.listen(port, () => {
    console.log('Server is listening on port', port);
}))

/**
 * kill the server or else the HMR build will stall 
 * @see https://vite.dev/guide/api-hmr
 */ 
if (isDev && import.meta.hot) {
    import.meta.hot.accept();
    import.meta.hot.dispose(async () => {
        console.log('HMR: Closing NestJS app...');
        await app.close()
    })
}

/**
 * Needed for angular dev server SSR
 * @see https://angular.dev/guide/hybrid-rendering#configuring-a-nodejs-server
 */
export const reqHandler = createNodeRequestHandler(app.getHttpAdapter().getInstance())