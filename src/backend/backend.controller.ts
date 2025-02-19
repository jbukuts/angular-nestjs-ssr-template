import { Controller, Get } from "@nestjs/common";


@Controller('api')
export class ApiController {
    @Get()
    async test() {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then((response) => response.json())
            
        return res;
    }
}