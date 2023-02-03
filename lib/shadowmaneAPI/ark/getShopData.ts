import { User } from '@/types/User'
import { PrismaClient } from '@prisma/client'
import { ShopPoints } from '../types/ShopPoints'

// Get Prisma
const prisma = new PrismaClient()

// Get Shop Points
export default async function getShopData(user: User) {
    const points: NonNullable<{ Points: number | null; TotalSpent: number | null; }> = await prisma.arkshopplayers.findFirst({
        where: { SteamId: BigInt(user.userId) },
        select: { Points: true, TotalSpent: true }
    }) ?? {Points: 0, TotalSpent: 0};

    return points as ShopPoints;
}