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

    const w_player_data = await knex.table('wtribes_playerdata')
    .select('SteamID')
    .select('isOwnerInTribe AS IsOwnerInTribe')
    .select('isAdminInTribe AS IsAdminInTribe')
    .where('TribeID', tribe_data.TribeID)
    .where('SteamID', user.userId)
    .first()

    
    if(!tribe_data) {
        return  res.status(200).json({
            api_version: 2,
            success: false,
            message: 'You have not joined a tribe!'
        })
    }

    if(!w_player_data.IsOwnerInTribe) {
        return  res.status(200).json({
            api_version: 2,
            success: false,
            message: 'You are not an admin in your tribe!'
        })
    }

    let value = 0

    if(!req.query.value) {
        return  res.status(200).json({
            api_version: 2,
            success: false,
            message: 'No value was provided!'
        })
    } else {
        if(req.query.value == "1") {
            value = 1
        } else {
            value = 0
        }
    }

    await knex.table('tribe_data')
    .select('isListed')
    .select('tribeid')
    .where('tribeid', tribe_data?.TribeID)
    .update({
        isListed: value
    })

    /*res.status(200).json({
        api_version: 2,
        player_data: player_data,
        tribe_data: tribe_data,
    });*/
    res.redirect("/hub/tribe_manager");
}

export default withIronSessionApiRoute(handler, sessionOptions);