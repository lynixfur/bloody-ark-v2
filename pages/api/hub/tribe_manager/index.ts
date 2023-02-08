import { PrismaClient } from '@prisma/client'
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from "@/lib/auth/session";

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

  const w_player_data: any = await prisma.wtribes_playerdata.findFirst({where: {
    SteamID: BigInt(user.userId)
  }})

  if(!w_player_data) {
    res.status(403).json({error: 'Internal Player data error', error_code: 1002});
    return;
  }

  const tribe_data: any = await prisma.wtribes_tribedata.findFirst({where: {
    TribeID: parseInt(w_player_data.TribeID)
  }})

  const tribe_owner_data: any = await prisma.player_data.findFirst({where: {
    steamid: BigInt(tribe_data.OwnerSteamID)
  }, select: {playername: true}})

  const tribe_members_data: any  = await prisma.wtribes_playerdata.findMany({where: {
    TribeID: parseInt(w_player_data.TribeID)
  }, select: {CharacterName: true, isOwnerInTribe: true, isAdminInTribe: true, SteamID: true}})

  const safe_tribe_members_data= JSON.parse(JSON.stringify(tribe_members_data, (key, value) => typeof value === 'bigint' ? value.toString() : value ));


  const tribe_data_internal: any  = await prisma.tribe_data.findFirst({where: {
    tribeid: parseInt(w_player_data.TribeID)
  }})

  /* Return All Required Data */
  res.status(200).json({
      tribe: {
          tribeId: w_player_data.TribeID,
          tribeName: tribe_data.TribeName,
          tribeOwner: tribe_owner_data.playername,
          tribeMembers: safe_tribe_members_data,
          tribeLocation: tribe_data_internal.map,
          tribeCreationDate: tribe_data_internal.creation_date,
          tribeAcceptingMembers: tribe_data_internal.isListed
      },
      notifications: {
          join_requests: [],
          invites: []
      }
  })
}


export default withIronSessionApiRoute(handler, sessionOptions);