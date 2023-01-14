import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

/* Session Stuff */
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/auth/session";

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let user = req.session.user;
  if (!user) {
    return res
      .status(200)
      .json({ message: "User is not logged in!", success: false });
  }

  const w_player_data = await prisma.wtribes_playerdata.findFirst({
    where: {
      SteamID: BigInt(user.userId),
    },
  });

  if (!w_player_data) {
    res.status(403).json({ error: "No data found!", error_id: 300 });
  }

  res.status(200).send(
    JSON.parse(
      JSON.stringify(
        w_player_data,
        (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
      )
    )
  );
}

export default withIronSessionApiRoute(handler, sessionOptions);