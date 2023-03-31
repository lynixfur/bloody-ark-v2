import { connectToDatabase } from '../../lib/mongodb'
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { db } = await connectToDatabase();

    const settings = await db.collection("settings").findOne({});
    res.status(200).json(settings)
}