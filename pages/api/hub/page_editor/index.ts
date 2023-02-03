import { connectToDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from "next";

/* Session Stuff */
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/auth/session";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const { db } = await connectToDatabase();

    // Check if POST or GET
    if (req.method === 'POST') {
        let user = req.session?.user;
        if (!user) {
          return res
            .status(200)
            .json({ message: "User is not logged in!", success: false });
        }

        let user_settings: any = await db
        .collection("users")
        .findOne({ steam_id: user.userId }, {projection: { _id: 0, permission_level: 1 }});

        if (user_settings.permission_level < 2) {
            return res
            .status(200)
            .json({ message: "User does not have permission to edit pages!", success: false });
        }

        const body = req.body;

        // Wait 5 seconds (Cooldown)
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Send Data
        try {
            await db.collection("pages").updateOne({_id: new ObjectId(body?.id?.toString())}, {$set: {content: body?.content}});
        } catch {
            console.log("Error updating page");
            return res.status(200).json({ success: false });
        }

        // Return Status
        return res.status(200).json({ success: true });
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

export default withIronSessionApiRoute(handler, sessionOptions);