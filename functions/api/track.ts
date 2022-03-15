import { Context } from "../interface/Context";
import { defaultError } from "../util/callback";

export async function onRequestGet(context: Context): Promise<Response> {
  const rGetTrack = await getSpotifyCurrentTrack(context);

  if (rGetTrack.ok) {
    return await getCurrentTrackResponse(rGetTrack);
  } else {
    try {
      const data: any = await rGetTrack.json();

      if (data.error.status === 401) {
        const rGetRefreshToken = await getSpotifyRefreshToken(context);
        try {
          if (rGetRefreshToken.ok) {
            const data: any = await rGetRefreshToken.json();

            const newToken = data.access_token;

            await context.env.SEVEN.put("spotifyToken", newToken);

            const rGetTrackRetry = await getSpotifyCurrentTrack(context);

            if (rGetTrackRetry.ok) {
              return await getCurrentTrackResponse(rGetTrackRetry);
            }
          }
        } catch (err) {
          return new Response(JSON.stringify({ error: 0, context}))
          return defaultError();
        }
      }

      return new Response(JSON.stringify({ error: 1, context}))
      return defaultError();
    } catch (err) {
      return new Response(JSON.stringify({ error: 2, context}))
      return defaultError();
    }
  }
}

async function getCurrentTrackResponse(response): Promise<Response> {
  try {
    const data = await response.json();
    return new Response(JSON.stringify({ data }));
  } catch (err) {
    // Spotify returns an empty body when no track is playing
    // - this response fails to be parsed from JSON
    return new Response(JSON.stringify({ data: false }));
  }
}

async function getBearerToken(context: Context): Promise<string> {
  const spotifyToken = await context.env.SEVEN.get("spotifyToken");
  return `Bearer ${spotifyToken}`;
}

async function getBasicToken(context: Context): Promise<string> {
  const clientId = await context.env.SPOTIFY_CLIENT_ID;
  const clientSecret = await context.env.SPOTIFY_CLIENT_SECRET;
  const token = `${clientId}:${clientSecret}`;
  return `Basic ${btoa(token)}`;
}

async function getSpotifyCurrentTrack(context: Context): Promise<Response> {
  const endpoint = "https://api.spotify.com/v1/me/player/currently-playing";
  const bearerToken = await getBearerToken(context);

  return fetch(endpoint, {
    headers: {
      Accept: "application/json",
      Authorization: bearerToken,
    },
  });
}

async function getSpotifyRefreshToken(context: Context): Promise<Response> {
  const endpoint = "https://accounts.spotify.com/api/token";
  const basicToken = await getBasicToken(context);
  const spotifyRefreshToken = await context.env.SPOTIFY_REFRESH_TOKEN;
  return fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: basicToken,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: spotifyRefreshToken,
    }),
  });
}
