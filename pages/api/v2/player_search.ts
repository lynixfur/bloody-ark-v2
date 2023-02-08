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

    /* Check Permission Level 2 */
    let user_cache: any = await db
        .collection("users")
        .findOne({ steam_id: user.userId }, { projection: { _id: 0, permission_level: 1 } });

    if (user_cache) {
        if (user_cache.permission_level != 2) {
            return res
                .status(200)
                .json({ api_version: 2, success: false, message: "Invalid Permissions!" });
        }
    } else {
        return res
            .status(200)
            .json({ api_version: 2, success: false, message: "The user is not cached!" });
    }

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

    const { search }: any = req.query

    if (!search) {
        return res
            .status(200)
            .json({ api_version: 2, success: false, message: "No Search Input!" });
    }

    const player_data = await knex('player_data')
        .leftJoin('wtribes_playerdata', 'player_data.steamid', 'wtribes_playerdata.SteamID')
        .where('player_data.steamid', search).orWhereILike('player_data.playername', `%${search}%`).first();

    let searched_user_cache: any = await db
        .collection("users")
        .findOne({ steam_id: player_data?.steamid });

    let tribe_data;
    let tribe_members;
    let owner;
    let internal_tribe_data;

    /* Tribe Data */
    if(player_data.TribeID) {
        tribe_data = await knex.table('wtribes_tribedata')
            .select('TribeID')
            .select('OwnerSteamID')
            .select('TribeName')
            .where('wtribes_tribedata.TribeID', player_data?.TribeID)
            .first()

        tribe_members = await knex.table('wtribes_playerdata')
            .innerJoin('player_data', 'wtribes_playerdata.SteamID', 'player_data.steamid')
            .select('wtribes_playerdata.SteamID')
            .select('player_data.playername')
            .select('wtribes_playerdata.isOwnerInTribe AS IsOwnerInTribe')
            .select('wtribes_playerdata.isAdminInTribe AS IsAdminInTribe')
            .where('TribeID', tribe_data?.TribeID)

         owner = await knex.table('player_data')
            .select('steamid AS SteamID')
            .select('player_data.playername AS PlayerName')
            .where('steamid', tribe_data?.OwnerSteamID)
            .first()

        internal_tribe_data = await knex.table('tribe_data')
            .select('isListed')
            .where('tribeid', tribe_data?.TribeID)
            .first()
    } else {
    }


    /* Return All Required Data */
    res.status(200).json({
        api_version: 2, player_data: player_data, user_cache: searched_user_cache,
        tribe_data: {
            TribeID: tribe_data?.TribeID,
            OwnerName: owner?.PlayerName,
            OwnerSteamID: tribe_data?.OwnerSteamID,
            TribeName: tribe_data?.TribeName,
            Members: tribe_members,
            IsListed: internal_tribe_data?.isListed
        }
    })
}

export default withIronSessionApiRoute(handler, sessionOptions);