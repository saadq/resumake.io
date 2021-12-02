import { Router } from 'oak';
import { denotex } from 'denotex';

const document = `
  \\documentclass{article}
  \\begin{document}
  hello world
  \\end{document}
`;

export const router = new Router({ prefix: '/api/generate' });

router.post('/pdf', async (ctx) => {
  const pdf = await denotex(document);
  ctx.response.body = pdf;
  ctx.response.type = 'application/pdf';
});

router.post('/tex', async (ctx) => {
  ctx.response.body = document;
  ctx.response.type = 'text/plain';
});
