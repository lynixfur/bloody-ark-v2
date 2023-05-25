import { NextApiRequest, NextApiResponse } from 'next';


async function handler(req: NextApiRequest, res: NextApiResponse) {
    return res.status(401).json({ message: 'API v3 is coming soon! Stay tuned.',
    features: {
        "cross-server": true,
        "lynix-auth": true,
        "steam-auth": true,
        "tribe-manager": true,
        "tribe-logs": true,
        "core-bloody-ark": true,
        "shadowmane": true,
        "core-shadowmane": true,
        "shadowmane-editor": true
    } });}

export default handler;