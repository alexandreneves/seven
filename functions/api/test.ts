import { iContext } from "../interface/iContext";

export async function onRequestGet(context: iContext) {
  return new Response("hello world");
}
