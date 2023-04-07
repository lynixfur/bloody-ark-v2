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
    if (req.method === 'GET') {
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

        // Wait 1 seconds (Cooldown)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Send Data
        let users = await db.collection("users").find({}).toArray();

        // Return Status
        res.status(200).json(users)
    }
}

export default withIronSessionApiRoute(handler, sessionOptions);