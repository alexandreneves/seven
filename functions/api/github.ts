import { iContext } from "../interface/iContext";
import { defaultError } from "../util/callback";

export async function onRequestGet(context: iContext) {
  const endpoint = "https://skyline.github.com/alexandreneves/2022.json";
  const response = await fetch(endpoint);

  if (!response.ok) return defaultError();

  try {
    const data = await response.json();
    return new Response(
      JSON.stringify({ data: parseContributions(data?.contributions) })
    );
  } catch (err) {
    defaultError(err);
  }
}

function parseContributions(weeks) {
  if (!weeks) return;
  // create new array
  const payload = [...weeks];
  // remove first week, it contains the last days of the previous year
  payload.shift();
  return payload;
}
