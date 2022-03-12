export function defaultError(err?: any) {
  return new Response(JSON.stringify({ error: err }));
}
