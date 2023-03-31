import { connectToDatabase } from '@/lib/mongodb'
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id, cluster } = req.query;
    const { db } = await connectToDatabase();

    const page_list = await db.collection("pages").find({cluster_parent: cluster}).project({ str_id: 1, page_icon: 1, title: 1 }).toArray();
    res.status(200).json(page_list)
}
  