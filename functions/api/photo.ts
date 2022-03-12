import * as cheerio from "cheerio";
import { iContext } from "../interface/iContext";
import { defaultError } from "../util/callback";

export async function onRequestGet(context: iContext) {
  const endpoint = "https://igdownloader.com/ajax";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: new URLSearchParams({
      link: "https://www.instagram.com/aneves",
      downloader: "profile",
    }),
  });

  if (!response.ok) return defaultError();

  try {
    const data = await response.json();
    const $ = cheerio.load(data.html);
    const photo = $(".post img").attr("src");
    return new Response(JSON.stringify({ data: photo }));
  } catch (err) {
    return defaultError(err);
  }
}
