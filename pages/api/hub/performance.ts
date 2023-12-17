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

  let w_player_data: any = await prisma.wtribes_playerdata.findFirst({where: {
    SteamID: BigInt(user.userId)
  }})

  const player_performance_data = await prisma.advancedachievements_playerdata.findFirst({
    where: { SteamID: BigInt(user.userId) },
    select: {
      SteamID: false,
      PlayerName: false,
      TribeName: false,
      TribeID: false,
      PlayTime: true,
      PlayerKills: true,
      DinoKills: true,
      WildDinoKills: true,
      DinosTamed: true,
      DeathByPlayer: true,
      DeathByDino: true,
      DeathByWildDino: true, 
    }
  });
  
  const player_daily_performance_data = await prisma.advancedachievements_daily_playerdata.findFirst({
    where: { SteamID: BigInt(user.userId) },
    select: {
      SteamID: false,
      PlayerName: false,
      TribeName: false,
      TribeID: false,
      PlayTime: true,
      PlayerKills: true,
      DinoKills: true,
      WildDinoKills: true,
      DinosTamed: true,
      DeathByPlayer: true,
      DeathByDino: true,
      DeathByWildDino: true, 
    }
  });
  
  let tribe_performance = null;

  if(w_player_data?.TribeID) {
    tribe_performance = await prisma.advancedachievements_tribedata.findFirst({ 
      where: { TribeID: parseInt(w_player_data.TribeID) },
      select: { TribeName: true, DamageScore: true}
    });
  } else {
    tribe_performance = {};
  }

  const player_score_data = await prisma.advancedachievements_playerdata_custom.findFirst({
    where: { steam_id: BigInt(user.userId) },
  });

  const player_daily_score_data = await prisma.advancedachievements_daily_playerdata_custom.findFirst({
    where: { steam_id: BigInt(user.userId) },
  });
  
  const safe_daily_performance_data = JSON.parse(JSON.stringify(player_daily_performance_data, (key, value) => typeof value === 'bigint' ? value.toString() : value ));
  const safe_performance_data = JSON.parse(JSON.stringify(player_performance_data, (key, value) => typeof value === 'bigint' ? value.toString() : value ));
  const safe_tribe_performance_data = JSON.parse(JSON.stringify(tribe_performance, (key, value) => typeof value === 'bigint' ? value.toString() : value ));
  const safe_score_data = JSON.parse(JSON.stringify(player_score_data, (key, value) => typeof value === 'bigint' ? value.toString() : value ));
  const safe_daily_score_data = JSON.parse(JSON.stringify(player_daily_score_data, (key, value) => typeof value === 'bigint' ? value.toString() : value ));


  /* Return All Required Data */
  res.status(200).send({
    daily_performance: safe_daily_performance_data,
    performance: safe_performance_data,
    score_data: safe_score_data,
    daily_score_data: safe_daily_score_data,
    tribe_performance: safe_tribe_performance_data
  });
}

export default withIronSessionApiRoute(handler, sessionOptions);