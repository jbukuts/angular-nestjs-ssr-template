import { Injectable, NestMiddleware } from '@nestjs/common';
import { AngularNodeAppEngine, writeResponseToNodeResponse } from '@angular/ssr/node';
import * as express from 'express';

const angularNodeAppEngine = new AngularNodeAppEngine()

@Injectable()
export class SsrMiddleware implements NestMiddleware {
  use(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { protocol, originalUrl, baseUrl } = req;
    console.log(protocol, originalUrl, baseUrl)

    angularNodeAppEngine.handle(req, { server: 'express' }).then((response) => {
      if (response) {
        const n = writeResponseToNodeResponse(response, res)
        return n
      }
      
      return next()
    }).catch(next)
  }
}