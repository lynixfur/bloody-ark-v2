import { PrismaClient, Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { env } from "process";


/* Session Stuff */
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/auth/session";

const prisma = new PrismaClient()


async function handler(req: NextApiRequest, res: NextApiResponse) {

    let user = req.session.user;
    if (!user) {
      return res
        .status(200)
        .json({ message: "User is not logged in!", success: false });
    }

  const search = req.query.search ? req.query.search : ""
  const ranking_data = await prisma.advancedachievements_tribedata.findMany({ 
    where: {
      TribeName: {
        contains: search.toString()
      }
    },
    orderBy: {
      DamageScore: 'desc',
    },
    skip: 20 * (req.query.page ? parseInt(req.query.page.toString()) : 0), // Page ID
    take: 20,
    select: { TribeName: true, DamageScore: true}
  });


  const safe_ranking_data = JSON.parse(JSON.stringify(ranking_data, (key, value) =>
  typeof value === 'bigint'
      ? value.toString()
      : value // return everything else unchanged
  ));

  const current_page = (req.query.page ? req.query.page : 0);
  const pages = await prisma.advancedachievements_tribedata.count({});
  var next_page = null;
  var prev_page = null;

  if(current_page < 69) {
    next_page = `${env.DOMAIN}/api/hub/tribe_rankings?page=${parseInt(current_page.toString()) + 1}&search=${search}`;
  }

  if(current_page > 0) {
    prev_page = `${env.DOMAIN}/api/hub/tribe_rankings?page=${parseInt(current_page.toString()) - 1}&search=${search}`;
  }

  /* Return All Required Data */
  res.status(200).send({
    pagination: {
      total_pages: Math.round(pages / 20) - 1,
      current_page: parseInt(current_page.toString()),
      next: next_page,
      prev: prev_page
    },
    ranking_data: safe_ranking_data
  });
}

export default withIronSessionApiRoute(handler, sessionOptions);