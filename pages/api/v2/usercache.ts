
import { connectToDatabase } from '@/lib/mongodb'
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { db } = await connectToDatabase();

    const { steam_id } = req.query

    const user_cache = await db.collection("users").findOne({
        steam_id: steam_id
    })

    res.status(200).json({api_version: 2, user_cache: user_cache})
}
  