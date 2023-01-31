import { connectToDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const { db } = await connectToDatabase();

    let page_data: any

    try {
        page_data = await db.collection("pages").findOne({_id: new ObjectId(id?.toString())});
    } catch {
        page_data = {}
    }
    const page_list = await db.collection("pages").find({}).project({ str_id: 1, page_icon: 1, title: 1 }).toArray();

    res.status(200).json({selected_page: page_data, all_pages: page_list})
}