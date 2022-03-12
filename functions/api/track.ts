import { iContext } from "../interface/iContext";
import { defaultError } from "../util/callback";

export async function onRequestGet(context: iContext): Promise<Response> {
  const response = await getSpotifyCurrentTrack(context);

  if (response.ok) {
    try {
      const data = await response.json();
      return new Response(JSON.stringify({ data }));
    } catch (err) {
      return new Response(JSON.stringify({ data: false }));
    }
  } else {
    try {
      const data = await response.json();

      if (data.error.status === 401) {
        const response2 = await getSpotifyRefreshToken(context);

        if (response2.ok) {
          try {
            const data = await response2.json();
            const newToken = data.access_token;

            context.env.SEVEN.put("spotifyToken", newToken);

            const response3 = await getSpotifyCurrentTrack(context);

            if (response3.ok) {
              try {
                const data = await response3.json();
                return new Response(JSON.stringify({ data }));
              } catch (err) {
                return new Response(JSON.stringify({ data: false }));
              }
            }
          } catch (err) {
            return defaultError();
          }
        }
      }

      return defaultError();
    } catch (err) {
      return defaultError();
    }
  }
}

async function getSpotifyCurrentTrack(context: iContext): Promise<Response> {
  const endpoint = "https://api.spotify.com/v1/me/player/currently-playing";
  return fetch(endpoint, {
    headers: {
      Accept: "application/json",
      Authorization: await getBearerToken(context),
    },
  });
}

async function getSpotifyRefreshToken(context: iContext): Promise<Response> {
  const endpoint = "https://accounts.spotify.com/api/token";
  return fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: await getBasicToken(context),
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: await context.env.SEVEN.get("spotifyRefreshToken"),
    }),
  });
}

async function getBearerToken(context: iContext): Promise<string> {
  return `Bearer ${await context.env.SEVEN.get("spotifyToken")}`;
}

async function getBasicToken(context: iContext): Promise<string> {
  const clientId = await context.env.SEVEN.get("spotifyClientId");
  const clientSecret = await context.env.SEVEN.get("spotifyClientSecret");
  const token = `${clientId}:${clientSecret}`;
  return `Basic ${btoa(token)}`;
}
