import SteamAuth from "node-steam-openid";

export const steamAuth = new SteamAuth({
  realm: `${process.env.REDIRECT_STEAM}`,
  returnUrl: `${process.env.REDIRECT_STEAM}/api/auth/authenticate`,
  apiKey: `${process.env.STEAM_API_KEY}`, // Steam API key
});