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

        // Wait 1 seconds (Cooldown)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Send Data
        try {
            await db.collection("pages").insertOne({
                title: body?.title,
                str_id: body?.str_id,
                page_icon: body?.page_icon,
                content: body?.content,
                cluster_parent: body?.cluster_parent,
                bg_image: body?.bg_image,
            });
        } catch {
            console.log("Error updating page");
            return res.status(200).json({ success: false });
        }

        // Return Status
        return res.status(200).json({ success: true });
    }
}

export default withIronSessionApiRoute(handler, sessionOptions);