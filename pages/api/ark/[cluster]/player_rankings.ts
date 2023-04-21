import { PrismaClient, Prisma } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb'

const prisma = new PrismaClient()

type Data = {
    pagination: any,
    ranking_data: any
}
  
type Page = any;
type CurrentPage = string;
type Search = any;
type SortBy = any;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { cluster } = req.query;

  /* Fetch Data From MongoDB */
  const { db } = await connectToDatabase();
  const cluster_data = await db.collection("clusters").findOne({ str_id: cluster});

  if(!cluster_data) {
    let error: any = { error: "Cluster Not Found!" };
    res.status(404).json(error);
  }

  /* New Beta Feature */
  const knex = require('knex')({
      client: 'mysql',
      connection: {
        host : cluster_data.database_url,
        port : cluster_data.database_port,
        user : cluster_data.database_username,
        password : cluster_data.database_password,
        database : cluster_data.database_db
      }
  });

  const search = req.query.search ? req.query.search : ""
  const filter = req.query.filter ? req.query.filter : ""

  let safeFilter = "PlayerKills"
 switch(filter) {
    case "Time Played":
      safeFilter = "PlayTime"
      break;
    case "Kills":
      safeFilter = "PlayerKills"
      break;
    case "Deaths":
      safeFilter = "DeathByPlayer"
      break;
    case "Tamed Dino Kills":
      safeFilter = "DinoKills"
      break;
  }

  const ranking_data = await knex.table('advancedachievements_playerdata')
  .select('PlayerName', 'TribeName', 'TribeID', 'PlayTime', 'PlayerKills', 'DinoKills', 'WildDinoKills', 'DinosTamed', 'DeathByPlayer', 'DeathByDino', 'DeathByWildDino')
  .whereLike('PlayerName', `%${search}%`)
  .orderBy(safeFilter, 'desc')
  .limit(15)
  .offset(15 * (req.query.page as Page ? req.query.page as Page : 0));
  /*const ranking_data = await prisma.advancedachievements_playerdata.findMany({
    orderBy: safeFilter,
    skip: 15 * (req.query.page as Page ? req.query.page as Page : 0), // Page ID
    take: 15,
    where: {
      PlayerName: {
        contains: search as Search
      }
    },
    select: {
      SteamID: false,
      PlayerName: true,
      TribeName: true,
      TribeID: true,
      PlayTime: true,
      PlayerKills: true,
      DinoKills: true,
      WildDinoKills: true,
      DinosTamed: true,
      DeathByPlayer: true,
      DeathByDino: true,
      DeathByWildDino: true, 
    },
  });*/
  //const result = await prisma.$queryRaw`SELECT * FROM advancedachievements_playerdata WHERE PlayerName like "%${search}%"`
  
  const safe_ranking_data = JSON.parse(JSON.stringify(ranking_data, (key, value) =>
  typeof value === 'bigint'
      ? value.toString()
      : value // return everything else unchanged
    ));

    const current_page = (req.query.page ? req.query.page : 0);
    const pages = 1000;
    var next_page = null;
    var prev_page = null;
  
    if(Number(current_page) < Math.round(pages / 20)) {
      next_page = `https://bloody.gg/api/ark/${cluster}/player_rankings?page=${parseInt(current_page as CurrentPage) + 1}&search=${search}`;
    }
  
    if(Number(current_page) > 0) {
      prev_page = `https://bloody.gg/api/ark/${cluster}/player_rankings?page=${parseInt(current_page as CurrentPage) - 1}&search=${search}`;
    }

  /* Return All Required Data */
  res.status(200).send({
    pagination: {
      total_pages: Math.round(pages / 20),
      current_page: parseInt(current_page as CurrentPage),
      next: next_page,
      prev: prev_page
    },
    ranking_data: safe_ranking_data
  });
}
