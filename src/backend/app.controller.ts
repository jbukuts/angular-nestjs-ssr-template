import { Controller, Get } from "@nestjs/common";


@Controller('api')
export class ApiController {
    @Get()
    async test() {
        console.log(process.env)
        const res = await fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then((response) => response.json())
        console.log(res);
        return { test: 'API DATA' };
    }
}