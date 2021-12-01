import { Application, Router } from 'oak';
import { logger } from './app/logger.ts';
import 'dotenv';

const port = Number(Deno.env.get('PORT'));
const app = new Application();
const router = new Router();

router.get('/', (ctx) => {
  ctx.response.body = 'Home';
});

router.get('/about', (ctx) => {
  ctx.response.body = 'About';
});

app.use(logger());
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server listening at http://localhost:${port}`);

await app.listen({ port });
