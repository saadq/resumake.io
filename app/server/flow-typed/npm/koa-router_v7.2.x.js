// flow-typed signature: 9595d08b68243bde57e24d04dce74acf
// flow-typed version: 902ad5f93f/koa-router_v7.2.x/flow_>=v0.25.x

/**
 * @flow
 */

type KoaRouter$Middleware<Ctx> = (
  ctx: Ctx,
  next: () => Promise<void>
) => Promise<void> | void;

type KoaRouter$ParamMiddleware<Ctx> = (
  param: string,
  ctx: Ctx,
  next: () => Promise<void>
) => Promise<void> | void;

declare module "koa-router" {
  import type { Context } from 'koa'

  declare class Router {
    constructor(opts?: {
      prefix?: string,
      sensitive?: boolean,
      strict?: boolean,
      methods?: Array<string>
    }): Router;

    get(
      name: string,
      route: string | string[],
      handler: KoaRouter$Middleware<Context>
    ): this;
    get(
      route: string | string[],
      ...middleware: Array<KoaRouter$Middleware<Context>>
    ): this;

    patch(
      name: string,
      route: string | string[],
      handler: KoaRouter$Middleware<Context>
    ): this;
    patch(
      route: string | string[],
      ...middleware: Array<KoaRouter$Middleware<Context>>
    ): this;

    post(
      name: string,
      route: string | string[],
      handler: KoaRouter$Middleware<Context>
    ): this;
    post(
      route: string | string[],
      ...middleware: Array<KoaRouter$Middleware<Context>>
    ): this;

    put(
      name: string,
      route: string | string[],
      handler: KoaRouter$Middleware<Context>
    ): this;
    put(
      route: string | string[],
      ...middleware: Array<KoaRouter$Middleware<Context>>
    ): this;

    delete(
      name: string,
      route: string | string[],
      handler: KoaRouter$Middleware<Context>
    ): this;
    delete(
      route: string | string[],
      ...middleware: Array<KoaRouter$Middleware<Context>>
    ): this;

    del(
      name: string,
      route: string | string[],
      handler: KoaRouter$Middleware<Context>
    ): this;
    del(
      route: string | string[],
      ...middleware: Array<KoaRouter$Middleware<Context>>
    ): this;

    all(
      name: string,
      route: string | string[],
      handler: KoaRouter$Middleware<Context>
    ): this;
    all(
      route: string | string[],
      ...middleware: Array<KoaRouter$Middleware<Context>>
    ): this;

    use(...middleware: Array<KoaRouter$Middleware<Context>>): this;
    use(
      path: string | Array<string>,
      ...middleware: Array<KoaRouter$Middleware<Context>>
    ): this;

    prefix(prefix: string): this;

    routes(): KoaRouter$Middleware<Context>;

    allowedMethods(options?: {
      throw?: boolean,
      notImplemented?: () => any,
      methodNotAllowed?: () => any
    }): KoaRouter$Middleware<Context>;

    param(param: string, middleware: KoaRouter$ParamMiddleware<Context>): this;

    redirect(source: string, destination: string, code?: number): this;

    route(name: string): any | false;

    url(name: string, params?: any): string | Error;

    static url(path: string, params: Object): string
  }

  declare module.exports: typeof Router;
}
