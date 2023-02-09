import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from "@/lib/auth/session";
import playerdata from '../playerdata';
import w_player_data from '../../ark/w_player_data';

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
    let { tribeid, steamid, is_invite }: any = req.query;
    if (!user) {
        return res
            .status(200)
            .json({ message: "User is not logged in!", success: false });
    }

    if(!is_invite) {
        return res.status(200).json({
            api_version: 2,
            success: false,
            message: 'You must provide a value for is_invite!'
        });
    }

    const player_data = await knex.table('player_data')
    .select('player_data.steamid AS SteamID')
    .select('player_data.playername AS PlayerName')
    .select('wtribes_playerdata.TribeID')
    .leftJoin('wtribes_playerdata', 'player_data.steamid', 'wtribes_playerdata.SteamID')
    .where('player_data.steamid', user.userId.toString())
    .first()

    const tribe_data = await knex.table('wtribes_tribedata')
    .select('TribeID')
    .select('OwnerSteamID')
    .select('TribeName')
    .where('wtribes_tribedata.TribeID', player_data.TribeID)
    .first()

    if(is_invite == true) {
        await knex('active_invites')
        .where('tribeid_requester', tribeid)
        .where('steamid_requested', player_data.SteamID)
        .del();
    } else {
        if(!tribe_data) {
            return res.status(200).json({
                api_version: 2,
                success: false,
                message: 'You are not in a tribe, this operation cannot be performed!'
            });
        }

        await knex('active_requests')
        .where('tribeid_request_to', tribe_data.TribeID)
        .where('steamid_requester', steamid)
        .del();

    }

    res.status(200).json({
        api_version: 2,
        success: true,
    });
}

export default withIronSessionApiRoute(handler, sessionOptions);