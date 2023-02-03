import { connectToDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const { db } = await connectToDatabase();

    // Check if POST or GET
    if (req.method === 'POST') {
        const { id, str_id, title, content, icon } = req.query;
        // Wait 5 seconds
        await new Promise(resolve => setTimeout(resolve, 5000));
        // Send Data
        res.status(200).json({ success: false });
        return;
    }

    if (req.method === 'GET') {
        let page_data: any

        try {
            page_data = await db.collection("pages").findOne({_id: new ObjectId(id?.toString())});
        } catch {
            page_data = {}
        }
        const page_list = await db.collection("pages").find({}).project({ str_id: 1, page_icon: 1, title: 1 }).toArray();
    
        res.status(200).json({selected_page: page_data, all_pages: page_list})
    }
}