import SteamAuth from "node-steam-openid";

export const steamAuth = new SteamAuth({
  realm: `${process.env.DOMAIN}`,
  returnUrl: `${process.env.DOMAIN}/api/auth/authenticate`,
  apiKey: `${process.env.STEAM_API_KEY}`, // Steam API key
});