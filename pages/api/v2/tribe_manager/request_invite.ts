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
    let { tribeid } = req.query;
    if (!user) {
        return res
            .status(200)
            .json({ message: "User is not logged in!", success: false });
    }

    if(!tribeid) {
        return res.status(200).json({
            api_version: 2,
            success: false,
            message: 'You must provide a tribe ID!'
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

    if(tribe_data) {
        return  res.status(200).json({
            api_version: 2,
            success: false,
            message: 'You have already joined a tribe!'
        })
    }

    const requested_tribe_data = await knex.table('wtribes_tribedata')
    .select('TribeID')
    .select('OwnerSteamID')
    .select('TribeName')
    .where('wtribes_tribedata.TribeID', tribeid)
    .first()

    //Wait 5 seconds
    await new Promise(r => setTimeout(r, 5000));

    if(!requested_tribe_data) {
        return res.status(200).json({
            api_version: 2,
            success: false,
            message: 'The tribe you are trying to join does not exist!'
        })
    }
    
    const active_request = await knex.table('active_requests')
    .select('active_requests.steamid_requester')
    .select('active_requests.tribeid_request_to')
    .where('active_requests.steamid_requester', player_data.SteamID)
    .where('active_requests.tribeid_request_to', tribe_data.TribeID)
    .first()

    if(active_request) {
        return res.status(200).json({
            api_version: 2,
            success: false,
            message: 'You have already requested to join this tribe!'
        })
    }

    await knex.table("active_requests").insert({
        steamid_requester: player_data.SteamID,
        tribeid_request_to: tribe_data.TribeID,
    });


    res.status(200).json({
        api_version: 2,
        success: true,
        requested_tribe_data: requested_tribe_data
    });
}

export default withIronSessionApiRoute(handler, sessionOptions);