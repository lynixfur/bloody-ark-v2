
/* API Endpoint : /api/auth/user */

import { connectToDatabase } from "@/lib/mongodb";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../../lib/auth/session";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      if (req.session.user) {
        // Additional User Settings
        const { db } = await connectToDatabase();
        let user_settings: any = await db
          .collection("users")
          .findOne({ steam_id: req.session.user.userId }, {projection: { _id: 0, permission_level: 1 }});

        return res
          .status(200)
          .json({ user: req.session.user, userSettings: user_settings, success: true });
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