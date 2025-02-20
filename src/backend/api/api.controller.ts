import { Controller, Get, Logger } from "@nestjs/common";

@Controller()
export class ApiController {
    private readonly logger = new Logger(ApiController.name);

    @Get()
    async test() {
        this.logger.debug('fetching data server-side');
        return fetch('https://jsonplaceholder.typicode.com/posts/1').then(r => r.json())
    }
}