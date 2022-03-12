import { iContext } from "../interface/iContext";
import { defaultError } from "../util/callback";

export async function onRequestGet(context: iContext): Promise<Response> {
  return new Response(JSON.stringify({context, SEVEN}));

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

function getSpotifyCurrentTrack(context: iContext): Promise<Response> {
  const endpoint = "https://api.spotify.com/v1/me/player/currently-playing";
  return fetch(endpoint, {
    headers: {
      Accept: "application/json",
      Authorization: getBearerToken(context),
    },
  });
}

function getSpotifyRefreshToken(context: iContext): Promise<Response> {
  const endpoint = "https://accounts.spotify.com/api/token";
  return fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: getBasicToken(context),
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: context.env.SEVEN.get("spotifyRefreshToken"),
    }),
  });
}

function getBearerToken(context: iContext): string {
  return `Bearer ${context.env.SEVEN.get("spotifyToken")}`;
}

function getBasicToken(context: iContext): string {
  const clientId = context.env.SEVEN.get("spotifyClientId");
  const clientSecret = context.env.SEVEN.get("spotifyClientSecret");
  const token = `${clientId}:${clientSecret}`;
  return `Basic ${btoa(token)}`;
}
