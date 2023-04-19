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

    const listed_tribes = await knex.table('tribe_data')
    .where('isListed', true)

    // if tribe is non existant return 
    if(!player_data?.TribeID) {
        return res.status(200).json({
            api_version: 2,
            player_data: player_data,
            listed_tribes: listed_tribes,
            tribe_data: {}
        });
    }

    const tribe_data = await knex.table('wtribes_tribedata')
    .select('TribeID')
    .select('OwnerSteamID')
    .select('TribeName')
    .where('wtribes_tribedata.TribeID', player_data.TribeID)
    .first()

    const diff_tribe_data = await knex.table('tribe_data')
    .select('tribeid')
    .select('map')
    .select('creation_date')
    .where('tribeid', player_data.TribeID)
    .first()

    if(!tribe_data) {
        return  res.status(200).json({
            api_version: 2,
            success: false,
            message: 'You have not joined a tribe!'
        })
    }

    const tribe_members = await knex.table('wtribes_playerdata')
    .innerJoin('player_data', 'wtribes_playerdata.SteamID', 'player_data.steamid')
    .select('wtribes_playerdata.SteamID')
    .select('player_data.playername')
    .select('wtribes_playerdata.isOwnerInTribe AS IsOwnerInTribe')
    .select('wtribes_playerdata.isAdminInTribe AS IsAdminInTribe')
    .where('TribeID', tribe_data?.TribeID)

    const owner = await knex.table('player_data')
    .select('steamid AS SteamID')
    .select('player_data.playername AS PlayerName')
    .where('steamid', tribe_data.OwnerSteamID)
    .first()

    const internal_tribe_data = await knex.table('tribe_data')
    .select('isListed')
    .where('tribeid', tribe_data.TribeID)
    .first()

    res.status(200).json({
        api_version: 2,
        player_data: player_data,
        listed_tribes: listed_tribes,
        tribe_data: {
            TribeID: tribe_data?.TribeID,
            OwnerName: owner?.PlayerName,
            OwnerSteamID: tribe_data?.OwnerSteamID,
            TribeName: tribe_data?.TribeName,
            Members: tribe_members,
            IsListed: internal_tribe_data.isListed,
            Map: diff_tribe_data.map,
            CreationDate: diff_tribe_data.creation_date,
        }
    });
}

export default withIronSessionApiRoute(handler, sessionOptions);