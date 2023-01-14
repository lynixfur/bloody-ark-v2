
/* API Endpoint : /api/auth/user */

import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../../lib/auth/session";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      if (req.session.user) {

        return res
          .status(200)
          .json({ message: req.session.user, success: true });
      } else {
        throw new Error("Session user does not exist.");
      }
    } catch (error: any) {
      return res.json({
        message: new Error(error).message,
        success: false,
      });
    }
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);