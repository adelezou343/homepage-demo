import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// 在构建时如果没有 DATABASE_URL，创建一个假的实例
export const prisma =
  process.env.DATABASE_URL
    ? globalForPrisma.prisma ?? new PrismaClient()
    : ({
        profile: {
          findFirst: async () => null,
          findUnique: async () => null,
          findMany: async () => [],
          create: async () => null,
          update: async () => null,
          delete: async () => null,
        },
        readingNote: {
          findFirst: async () => null,
          findUnique: async () => null,
          findMany: async () => [],
          create: async () => null,
          update: async () => null,
          delete: async () => null,
        },
        aIArticle: {
          findFirst: async () => null,
          findUnique: async () => null,
          findMany: async () => [],
          create: async () => null,
          update: async () => null,
          delete: async () => null,
        },
        insight: {
          findFirst: async () => null,
          findUnique: async () => null,
          findMany: async () => [],
          create: async () => null,
          update: async () => null,
          delete: async () => null,
        },
        admin: {
          findFirst: async () => null,
          findUnique: async () => null,
          findMany: async () => [],
          create: async () => null,
          update: async () => null,
          delete: async () => null,
        },
      } as any)

if (process.env.NODE_ENV !== 'production' && process.env.DATABASE_URL) {
  globalForPrisma.prisma = prisma
}
