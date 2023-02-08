import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from '@/lib/mongodb'

/* Session Stuff */
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/auth/session";
import { env } from "process";

async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { db } = await connectToDatabase();

    let user = req.session.user;
    if (!user) {
        return res
            .status(200)
            .json({ message: "User is not logged in!", success: false });
    }

    const knex = require('knex')({
        client: 'mysql',
        connection: {
        host : env.MYSQL_HOST,
        port : env.MYSQL_PORT,
        user : env.MYSQL_USER,
        password : env.MYSQL_PASSWORD,
        database : env.MYSQL_DATABASE
        }
    });

    const dino_auctions = await knex("dinoauction_dinos")
    .select("owner_steamid")
    .select("dino_name")
    .select("dino_description")
    .select("starting_price")
    .select("buy_now_price")
    .select("current_bid")
    .select("current_bid_owner")
    .select("current_bid_name")

    /* Return All Required Data */
    res.status(200).json({
        api_version: 2,
        dino_auctions: dino_auctions
    })
}

export default withIronSessionApiRoute(handler, sessionOptions);