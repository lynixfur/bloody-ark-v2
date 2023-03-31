import { connectToDatabase } from '@/lib/mongodb'
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id, cluster } = req.query;
    const { db } = await connectToDatabase();
    
    const page_data = await db.collection("pages").findOne({str_id: id, cluster_parent: cluster});

    res.status(200).json(page_data)
}