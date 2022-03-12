import { iContext } from "../interface/iContext";
import { defaultError } from "../util/callback";

const err = [];

export async function onRequestGet(context: iContext): Promise<Response> {
  const rGetTrack = await getSpotifyCurrentTrack(context);

  if (rGetTrack.ok) {
    return await getCurrentTrackResponse(rGetTrack);
  } else {
    try {
      const data = await rGetTrack.json();

      err.push({ 0: data.error.status });

      if (data.error.status === 401) {
        const rGetRefreshToken = await getSpotifyRefreshToken(context);
        const data = await rGetRefreshToken.json();

        err.push({ 1: rGetRefreshToken.ok, data});

        try {
          if (rGetRefreshToken.ok) {
            const data = await rGetRefreshToken.json();

            err.push({ 2: data });

            const newToken = data.access_token;

            err.push({ 3: newToken });

            await context.env.SEVEN.put("spotifyToken", newToken);

            const rGetTrackRetry = await getSpotifyCurrentTrack(context);

            err.push({ 4: rGetTrackRetry.ok });

            if (rGetTrackRetry.ok) {
              return await getCurrentTrackResponse(rGetTrackRetry);
            }
          }
        } catch (err) {
          return defaultError();
        }
      }

      const token = await context.env.SEVEN.get("spotifyToken");

      return defaultError({ n: 0, token, err });
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
  const spotifyToken = await context.env.SEVEN.get("spotifyToken");
  return `Bearer ${spotifyToken}`;
}

async function getBasicToken(context: iContext): Promise<string> {
  const clientId = await context.env.SEVEN.get("spotifyClientId");
  const clientSecret = await context.env.SEVEN.get("spotifyClientSecret");
  const token = `${clientId}:${clientSecret}`;
  return `Basic ${btoa(token)}`;
}

async function getSpotifyCurrentTrack(context: iContext): Promise<Response> {
  const endpoint = "https://api.spotify.com/v1/me/player/currently-playing";
  const bearerToken = await getBearerToken(context);

  err.push({ bet: bearerToken });

  return fetch(endpoint, {
    headers: {
      Accept: "application/json",
      Authorization: bearerToken,
    },
  });
}

async function getSpotifyRefreshToken(context: iContext): Promise<Response> {
  const endpoint = "https://accounts.spotify.com/api/token";
  const basicToken = await getBasicToken(context);
  const spotifyRefreshToken = await context.env.SEVEN.get(
    "spotifyRefreshToken"
  );

  err.push({ bat: basicToken });

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
