import { Prisma, PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';
import { connectToDatabase } from '@/lib/mongodb'

const prisma = new PrismaClient()

type Data = {
  pagination: any,
  ranking_data: any
}

type CurrentPage = string;
type Search = any;

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

  //const search = req.query.search ? req.query.search : ""
  const filter = req.query.filter ? req.query.filter : ""

  let search = req.query.search ? "%" + req.query.search + "%" : "%%";
  

  let safeFilter = "DamageScore"
  switch(filter) {
    case "Time Played":
      safeFilter = "PlayTime"
      break;
    case "Kills":
      safeFilter = "Kills"
      break;
    case "Deaths":
      safeFilter = "Deaths"
      break;
    case "Tame Kills":
      safeFilter = "DinoKills"
      break;
  }

  const current_page = Number(req.query?.page ? req.query?.page : 0);

  const ranking_data = await knex.table('advancedachievements_playerdata')
  .select('advancedachievements_playerdata.TribeID', 'advancedachievements_tribedata.TribeName', 'advancedachievements_tribedata.DamageScore')
  .innerJoin('advancedachievements_tribedata', 'advancedachievements_playerdata.TribeID', 'advancedachievements_tribedata.TribeID')
  .sum('PlayerKills as Kills')
  .sum('DeathByPlayer as Deaths')
  .sum('DinoKills as DinoKills')
  .sum('PlayTime as PlayTime')
  .whereLike('advancedachievements_tribedata.TribeName', `%${search}%`)
  .groupBy('advancedachievements_playerdata.TribeID')
  .orderBy(safeFilter, 'desc')
  .limit(20)
  .offset(20 * current_page)

  const safe_ranking_data = JSON.parse(JSON.stringify(ranking_data, (key, value) =>
  typeof value === 'bigint'
      ? value.toString()
      : value // return everything else unchanged
  ));

  const count = await knex.table('advancedachievements_tribedata').select('TribeName')

  var next_page = null;
  var prev_page = null;

  if(current_page < 69) {
    next_page = `https://bloody.gg/api/ark/6men/tribe_rankings?page=${current_page}&search=${search}`;
  }

  if(current_page > 0) {
    prev_page = `https://bloody.gg/api/ark/6men/tribe_rankings?page=${current_page}&search=${search}`;
  }

  /* Return All Required Data */
  res.status(200).send({
    pagination: {
      total_pages: Math.round(count.length / 20),
      current_page: current_page,
      next: next_page,
      prev: prev_page
    },
    ranking_data: safe_ranking_data
  });
}
