import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  async use(_req: Request, _res: Response, next: NextFunction) {
    console.log('global middleware')
    return next()
  }
}