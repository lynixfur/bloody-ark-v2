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

  /* New Beta Feature */
  const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'sqlduo.bloody-ark.com',
      port : 3306,
      user : 'bloodyhub',
      password : 'KImbwj%1uuH3DZ1s',
      database : 'arkdbduo'
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

  const ranking_data = await knex.table('advancedachievements_tribedata')
  .select('advancedachievements_tribedata.TribeID', 'advancedachievements_tribedata.TribeName', 'advancedachievements_tribedata.DamageScore')

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
