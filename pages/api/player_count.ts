
import { connectToDatabase } from '../../lib/mongodb'
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { db } = await connectToDatabase();

    const servers = await db.collection("servers").find({}).project({ is_online: 1, players: 1, arkservers_api_key: 1 }).toArray();
    
    var global_count = 0;

    servers.forEach(async (server: any) => {
        global_count += parseInt(server.players);
    })

    res.status(200).json({players: parseInt(global_count.toString())})
}
  