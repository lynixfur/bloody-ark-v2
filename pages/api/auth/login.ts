/* API Endpoint : /api/auth/login */

import { NextApiRequest, NextApiResponse } from "next";
import { steamAuth } from "../../../lib/auth/steamAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const redirectUrl = await steamAuth.getRedirectUrl();
      return res.redirect(redirectUrl);
    } catch (error: any) {
      return res.json({
        message: new Error(error).message,
        success: false,
      });
    }
  }
}