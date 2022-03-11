import axios from "axios";
import { iContext } from "../interface/iContext";

export async function onRequestGet(context: iContext) {
  await axios({
    method: "GET",
    url: "/api/github",
  })
    .then((payload) => {
      const data = parseContributions(payload?.data?.contributions);
      return new Response(JSON.stringify({ data }));
    })
    .catch((err) => new Response(JSON.stringify({ error: true })));
}

function parseContributions(weeks) {
  if (!weeks) return;
  // create new array
  const payload = [...weeks];
  // remove first week, it contains the last days of the previous year
  payload.shift();
  return payload;
}
