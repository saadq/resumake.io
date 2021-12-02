import { Application, Router } from 'oak';
import { logger } from './app/logger.ts';
import { errorHandler } from './app/errorHandler.ts';
import { router } from './generator/routes.ts';

const port = Number(Deno.env.get('PORT'));
const app = new Application();

app.use(errorHandler());
app.use(logger());
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener('listen', () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.addEventListener('error', (error) => {
  console.error(error);
});

await app.listen({ port });
