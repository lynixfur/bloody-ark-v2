import { NextApiRequest, NextApiResponse } from 'next';


async function handler(req: NextApiRequest, res: NextApiResponse) {
    return res.status(401).json({ message: 'Unauthorized' });}

export default handler;