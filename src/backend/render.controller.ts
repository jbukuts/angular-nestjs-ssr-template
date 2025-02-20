import { Controller, Get, Next, Req, Res } from "@nestjs/common";
import type { NextFunction, Request, Response } from 'express';
import { AngularNodeAppEngine, writeResponseToNodeResponse } from '@angular/ssr/node';

const angularNodeAppEngine = new AngularNodeAppEngine()

@Controller()
export class RenderController {
    @Get('/')
    async home(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
        console.log('fetch data from home')
        const data = await fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then((response) => response.json())

        this.render(req, res, next)
    }

    @Get('*')
    async render(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
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