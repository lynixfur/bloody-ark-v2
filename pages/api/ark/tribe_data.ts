import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.query.TribeID) {
    res.status(403).json({ error: "Access Denied!" });
    return;
  }

  const tribe_data = await prisma.wtribes_tribedata.findFirst({
    where: {
      TribeID: parseInt(req.query.TribeID[0]),
    },
  });

  if (!tribe_data) {
    res.status(403).json({ error: "No data found!", error_id: 300 });
    return;
  }

  res.status(200).send(
    JSON.parse(
      JSON.stringify(
        tribe_data,
        (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
      )
    )
  );
}
