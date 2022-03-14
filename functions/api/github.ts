import { Context } from "../interface/Context";
import { defaultError } from "../util/callback";

export async function onRequestGet(context: Context) {
  const year = new Date().getFullYear();
  const endpoint = `https://skyline.github.com/alexandreneves/${year}.json`;
  const response = await fetch(endpoint);

  if (!response.ok) return defaultError();

  try {
    const data: any = await response.json();
    const contributions = data?.contributions;
    if (!contributions) throw new Error();
    return new Response(JSON.stringify({ data: contributions }));
  } catch (err) {
    defaultError(err);
  }
}
