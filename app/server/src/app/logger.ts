import { Middleware } from 'oak';

export function logger(): Middleware {
  return async (ctx, next) => {
    await next();
    const { method, url } = ctx.request;
    const { status } = ctx.response;
    const message = `${method} ${url.pathname} => ${status}`;
    console.log(message);
  };
}
