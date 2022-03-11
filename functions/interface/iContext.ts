export interface iContext {
  request: any; // same as existing Worker API
  env: any; // same as existing Worker API
  params: any; // if filename includes [id] or [[path]]
  waitUntil: any; // same as ctx.waitUntil in existing Worker API
  next: any; // used for middleware or to fetch assets
  data: any; // arbitrary space for passing data between middlewares
}
