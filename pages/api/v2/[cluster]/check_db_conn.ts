import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';
import { connectToDatabase } from '@/lib/mongodb'

type Data = {
    connected: Boolean,
    msg: string
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

  // Check if DB is connected
  await knex.raw('SELECT 1+1 AS result').then(() => {
    res.status(200).json({
        connected: true,
        msg: 'Successfully connected to database!'
    });
  }).catch(async (err: any) => {
    res.status(200).json({
        connected: false,
        msg: err
    });
  });

}
