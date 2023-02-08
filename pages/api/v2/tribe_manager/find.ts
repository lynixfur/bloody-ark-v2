import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from "@/lib/auth/session";
import playerdata from '../playerdata';

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: env.MYSQL_HOST,
        port: env.MYSQL_PORT,
        user: env.MYSQL_USER,
        password: env.MYSQL_PASSWORD,
        database: env.MYSQL_DATABASE,
        supportBigNumbers: true,
        bigNumberStrings: true,
    }
});

async function handler(req: NextApiRequest, res: NextApiResponse) {

    let user = req.session.user;
    if (!user) {
        return res
            .status(200)
            .json({ message: "User is not logged in!", success: false });
    }

    const tribes = await knex.table('tribe_data')
    .where('isListed', true)


    res.status(200).json({
        api_version: 2,
        tribes: tribes
    });
}

export default withIronSessionApiRoute(handler, sessionOptions);