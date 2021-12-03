import { Router } from 'oak';
import { denotex } from 'denotex';

const texDoc = `
  \\documentclass{article}
  \\begin{document}
  hi REPLACEME
  \\end{document}
`;

export const router = new Router({ prefix: '/api/generate' });

router.post('/pdf', async (ctx) => {
  const formData = await ctx.request.body().value;
  const tex = texDoc.replace(/REPLACEME/, formData.basics.fullName);
  const pdf = await denotex(tex);
  ctx.response.body = pdf;
  ctx.response.type = 'application/pdf';
});

router.post('/tex', async (ctx) => {
  ctx.response.body = texDoc;
  ctx.response.type = 'text/plain';
});
