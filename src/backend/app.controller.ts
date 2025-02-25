import {
  AngularNodeAppEngine,
  writeResponseToNodeResponse
} from '@angular/ssr/node';
import { Controller, Get, Logger, Next, Req, Res } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

const angularNodeAppEngine = new AngularNodeAppEngine();

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  @Get('*')
  async render(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction
  ) {
    const { originalUrl } = req;
    this.logger.verbose(`attempting to render ${originalUrl}`);

    angularNodeAppEngine
      .handle(req, { server: 'express' })
      .then((response) => {
        if (response) {
          this.logger.verbose(`returning rendered ${originalUrl}!`);
          const n = writeResponseToNodeResponse(response, res);
          return n;
        }

        return next();
      })
      .catch(next);
  }
}
