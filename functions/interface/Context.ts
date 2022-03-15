export interface Context
  extends EventContext<
    {
      SEVEN: any;
      SPOTIFY_CLIENT_ID: string;
      SPOTIFY_CLIENT_SECRET: string;
      SPOTIFY_REFRESH_TOKEN: string;
    },
    string,
    any
  > {}
