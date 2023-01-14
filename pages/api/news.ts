import { connectToDatabase } from '../../lib/mongodb'
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { db } = await connectToDatabase();

    /* News API */
    const news = await db.collection("news").find({}).limit(2).project({ username: 1, avatar_url: 1, content: 1}).toArray();
    res.status(200).json(news)
}