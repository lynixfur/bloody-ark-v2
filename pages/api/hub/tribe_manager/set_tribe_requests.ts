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
    steamid: user.userId
  }})

  if(!player_data) {
    res.status(403).json({error: 'Player data error', error_code: 1001});
    return;
  }

  const w_player_data: any = await prisma.wtribes_playerdata.findFirst({where: {
    SteamID: user.userId
  }})

  if(!w_player_data) {
    res.status(403).json({error: 'Internal Player data error', error_code: 1002});
    return;
  }

  const tribe_data_internal = await prisma.tribe_data.update({
    where: { tribeid: w_player_data.TribeID },
    select: { isListed: true, tribeid: true },
    data: { isListed: parseInt(req?.query?.value) }
  })

  console.log(tribe_data_internal)

  const safe_tribe_data = JSON.parse(JSON.stringify(tribe_data_internal, (key, value) => typeof value === 'bigint' ? value.toString() : value ));


  //res.status(200).json(safe_tribe_data); USED FOR DEBUG ONLY!
  res.redirect("/hub/tribe_manager");
}

export default withIronSessionApiRoute(handler, sessionOptions);