import { connectToDatabase } from '../../../lib/mongodb'
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { db } = await connectToDatabase();

    const servers = await db.collection("servers").find({visible: true, type: '2men'}).project({ name: 1, visible: 1, connection_url: 1, geolocation: 1, server_bg: 1, server_icon: 1, is_online: 1, players: 1 }).toArray();
    res.status(200).json(servers)
}
  