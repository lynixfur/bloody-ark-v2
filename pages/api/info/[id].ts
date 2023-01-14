import { connectToDatabase } from '../../../lib/mongodb'
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const { db } = await connectToDatabase();
    
    const page_data = await db.collection("pages").findOne({str_id: id});

    res.status(200).json(page_data)
}