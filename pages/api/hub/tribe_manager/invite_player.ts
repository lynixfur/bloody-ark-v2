import { sessionOptions } from '@/lib/auth/session';
import { PrismaClient } from '@prisma/client'
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';


const prisma = new PrismaClient()


async function handler(req: any, res: NextApiResponse) {
  
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

  const w_player_data: any = await prisma.wtribes_playerdata.findFirst({where: {
    SteamID: BigInt(user.userId)
  }})

  /* Check if the user is admin of tribe or owner of tribe */
  /* This check is important for permission to invite users */

  const permissions: any = await prisma.wtribes_playerdata.findFirst({where: {
    TribeID: parseInt(w_player_data.TribeID),
    SteamID: BigInt(user.userId)
  }, select: {isAdminInTribe: true, isOwnerInTribe: true}})

  if(permissions.isAdminInTribe === 0 && permissions.isOwnerInTribe === 0) {
    res.status(403).json({error: 'Player is not admin or owner of the tribe! You are not allowed to invite new players to this tribe', error_code: 1005});
    return;
  }
  
  /* Find Player with Player Name */
  const invited_player: any = await prisma.player_data.findFirst({where: {
    playername: req?.query?.player
  }, select: {playername: true, steamid: true}})


  /* Create Invite */
  const invite = await prisma.active_invites.create({
    data: {
        steamid_requested: BigInt(invited_player.steamid),
        tribeid_requester: parseInt(w_player_data.TribeID)
    },
  })

  res.redirect("/hub/tribe_manager");
}

export default withIronSessionApiRoute(handler, sessionOptions);