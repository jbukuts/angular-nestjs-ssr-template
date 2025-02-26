import { Controller, Get, Logger, Query } from '@nestjs/common';

@Controller()
export class ApiController {
  private readonly logger = new Logger(ApiController.name);

  @Get()
  async test(@Query('wait') wait: number) {
    this.logger.debug('fetching data server-side');
    this.logger.debug(wait);
    if (wait && wait > 0) await new Promise((r) => setTimeout(r, wait));

    const data = await fetch(
      'https://jsonplaceholder.typicode.com/posts/1'
    ).then((r) => r.json());

    return {
      ...data,
      ts: Date.now()
    };
  }
}
