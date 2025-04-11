import { PrismaClient } from "@/app/generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = global as unknown as {
	prisma: PrismaClient;
};

const prisma =
	globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
else  globalForPrisma.prisma = new PrismaClient();

export default prisma;
