import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AppMiddleware.name);

  async use(_req: Request, _res: Response, next: NextFunction) {
    // this.logger.debug('global middleware')
    return next();
  }
}
