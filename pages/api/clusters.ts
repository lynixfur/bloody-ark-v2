import { connectToDatabase } from '../../lib/mongodb'
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { db } = await connectToDatabase();

    const clusters = await db.collection("clusters").find({}).project({_id: 1, str_id:1, cluster_name:1}).toArray();
    res.status(200).json(clusters)
}