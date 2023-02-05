import { NextApiRequest, NextApiResponse } from "next";

/* Session Stuff */
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/auth/session";
import { env } from "process";

async function handler(req: NextApiRequest, res: NextApiResponse) {

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

    const player_data = knex('player_data').where({ steamid: user.userId }).first();

    console.log(player_data)

    /* Return All Required Data */
    res.status(200).json({ api_version: 2, player_data: {} })
}

export default withIronSessionApiRoute(handler, sessionOptions);