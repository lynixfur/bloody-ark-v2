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

  const user_requests = await prisma.active_invites.delete({
    where: { steamid_requested: BigInt(user.userId) }
  })

  res.redirect("/hub"); 
}

export default withIronSessionApiRoute(handler, sessionOptions);