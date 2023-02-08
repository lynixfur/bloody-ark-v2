/* API Endpoint : /api/auth/authenticate */

import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/auth/session";
import { steamAuth } from "../../../lib/auth/steamAuth";
import { connectToDatabase } from "@/lib/mongodb";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {

      // User Information
      const steamUser = await steamAuth.authenticate(req);

      req.session.user = {
        userId: steamUser.steamid,
        username: steamUser.username,
        avatarUrl: steamUser.avatar.large,
      };

      // Connect to Database
      const { db } = await connectToDatabase();

      // Check if User exists
       let user_cache: any = await db
          .collection("users")
          .findOne({ steam_id: req.session.user.userId }, {projection: { _id: 0, permission_level: 1 }});
      
      if(user_cache) {
        console.log("[Cache] User already has userdata stored in Cache!")
      } else {
        console.log("[Cache] Creating Userdata...")
        await db.collection("users").insertOne({
          username: steamUser.username,
          steam_id: steamUser.steamid,
          avatar_url: steamUser.avatar,
          permission_level: 0
        })
      }


      await req.session.save();

      return res.redirect("/hub");
    } catch (error: any) {
      /*return res.json({
        message: new Error(error).message,
        success: false,
      });*/

      return res.redirect(`/error?msg=${new Error(error).message}`);
    }
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);