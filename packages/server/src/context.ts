import { PrismaClient } from '@prisma/client';
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';

const prisma = new PrismaClient();

export async function createContext({ req, res }: CreateExpressContextOptions) {
  // Extract userId from cookie (set by auto-login middleware)
  const userId = req.cookies?.userId as string | undefined;

  return {
    req,
    res,
    prisma,
    userId,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
