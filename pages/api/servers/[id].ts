import { connectToDatabase } from '../../../lib/mongodb'
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { db } = await connectToDatabase();
    const { id } = req.query;

    const cluster = await db.collection("clusters").findOne({str_id: id});
    
    if(cluster) {
        const servers = await db.collection("servers").find({visible: true, "cluster.id": cluster.str_id}).project({ name: 1, visible: 1, connection_url: 1, geolocation: 1, server_bg: 1, server_icon: 1, is_online: 1, players: 1, cluster: 1 }).toArray();
        res.status(200).json(servers)   
    } else {
        res.status(404).json({message: "Cluster not found"})
    }
}
  