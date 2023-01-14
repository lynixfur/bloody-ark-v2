import { PrismaClient, Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { env } from "process";


/* Session Stuff */
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/auth/session";



const prisma = new PrismaClient()


async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    let user = req.session.user;
    if (!user) {
      return res
        .status(200)
        .json({ message: "User is not logged in!", success: false });
    }

  const player_data = await prisma.player_data.findFirst({where: {
    steamid: BigInt(user.userId)
  }})

  if(!player_data) {
    res.status(403).json({error: 'Player data error', error_code: 1001});
    return;
  }

  const w_player_data = await prisma.wtribes_playerdata.findFirst({where: {
    SteamID: BigInt(user.userId)
  }})

  const user_requests = await prisma.active_invites.findMany({
    where: { steamid_requested: BigInt(user.userId) }
  })

  const safe_requests = JSON.parse(JSON.stringify(user_requests, (key, value) => typeof value === 'bigint' ? value.toString() : value ));
  res.status(200).json(safe_requests); 
}

export default withIronSessionApiRoute(handler, sessionOptions);