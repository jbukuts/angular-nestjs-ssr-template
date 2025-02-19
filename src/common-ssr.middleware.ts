import { Injectable, NestMiddleware } from '@nestjs/common';
import { CommonEngine} from '@angular/ssr/node';
import * as express from 'express';
import bootstrap from './frontend/main.server';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { APP_BASE_HREF } from '@angular/common';

const serverDistFolder = resolve(dirname(fileURLToPath(import.meta.url)), '../');
const browserDistFolder = resolve(serverDistFolder, 'browser');
const indexHtml = resolve(serverDistFolder, './server/index.server.html');
const commonEngine = new CommonEngine();

@Injectable()
export class SsrMiddleware implements NestMiddleware {
  use(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { protocol, originalUrl, baseUrl, headers } = req;
    console.log(protocol, originalUrl, baseUrl)

    commonEngine
        .render({
          bootstrap,
          documentFilePath: indexHtml,
          url: `${protocol}://${headers.host}${originalUrl}`,
          publicPath: browserDistFolder,
          providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
        })
        .then((html) => res.send(html))
        .catch((err) => next(err));
  }
}