import { Middleware } from 'oak';

/** The standard logging function that processes and logs requests. */
export function logger(): Middleware {
  return async ({ request, response }, next) => {
    await next();
    const { method, url } = request;
    const { status } = response;
    const message = `${method} ${url.pathname} => ${status}`;
    console.log(message);
  };
}
