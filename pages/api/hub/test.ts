import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next";

/* Session Stuff */
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/auth/session";
import getShopData from '@/lib/shadowmaneAPI/ark/getShopData';
import { ShopPoints } from '@/lib/shadowmaneAPI/types/ShopPoints';


const prisma = new PrismaClient()


async function handler(req: NextApiRequest, res: NextApiResponse) {

    let user = req.session.user;
    if (!user) {
        return res
            .status(200)
            .json({ message: "User is not logged in!", success: false });
    }

    let points = await getShopData(user);

  /* Return All Required Data */
  res.status(200).json({
      is_banned: false,
      player: {
          username: null,
          playerId: null
      },
      tribe: {
          tribeId: null,
          tribeName: null,
          tribeOwner: null,
          tribeMembers: null,
          tribeLocation: null,
          tribeCreationDate: null,
          permissionsGroups: null,
          timedPermissionGroups: null
      },
      quick_servers: null,
      notifications: {
          join_requests: null,
          invites: null,
          chat_msgs: {
            error: "Unsupported by Shadowmane API v2.0, Please wait for ShadowmaneAPI v2.1"
          }
      },
      extra_data: {
        points: points.Points,
        points_spent: points.TotalSpent,
        dino_tokens: null,
        player_rename_tokens: null,
        groups: null,
        pvp_status: null
      }
  })
}

export default withIronSessionApiRoute(handler, sessionOptions);