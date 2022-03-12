import { iContext } from "../interface/iContext";
import { defaultError } from "../util/callback";

export async function onRequestGet(context: iContext): Promise<Response> {
  const rGetTrack = await getSpotifyCurrentTrack(context);

  if (rGetTrack.ok) {
    return await getCurrentTrackResponse(rGetTrack);
  } else {
    try {
      const data = await rGetTrack.json();

      if (data.error.status === 401) {
        const rGetRefreshToken = await getSpotifyRefreshToken(context);

        if (rGetRefreshToken.ok) {
          const data = await rGetRefreshToken.json();
          const newToken = data.access_token;

          await context.env.SEVEN.put("spotifyToken", newToken);

          const rGetTrackRetry = await getSpotifyCurrentTrack(context);

          if (rGetTrackRetry.ok) {
            return await getCurrentTrackResponse(rGetTrackRetry);
          }
        }
      }

      return defaultError();
    } catch (err) {
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

async function getBearerToken(context: iContext): Promise<string> {
  return `Bearer ${await context.env.SEVEN.get("spotifyToken")}`;
}

async function getBasicToken(context: iContext): Promise<string> {
  const clientId = await context.env.SEVEN.get("spotifyClientId");
  const clientSecret = await context.env.SEVEN.get("spotifyClientSecret");
  const token = `${clientId}:${clientSecret}`;
  return `Basic ${btoa(token)}`;
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
