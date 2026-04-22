import { PrismaClient } from "@prisma/client"

function withPoolLimits(value: string | undefined) {
  if (!value) return value

  try {
    const url = new URL(value)
    if (!url.searchParams.has("connection_limit")) {
      url.searchParams.set("connection_limit", "1")
    }
    if (!url.searchParams.has("pool_timeout")) {
      url.searchParams.set("pool_timeout", "30")
    }
    return url.toString()
  } catch {
    return value
  }
}

// Runtime fallbacks for common deployment env names.
if (!process.env.POSTGRES_PRISMA_URL && process.env.DATABASE_URL) {
  process.env.POSTGRES_PRISMA_URL = process.env.DATABASE_URL
}
process.env.POSTGRES_PRISMA_URL = withPoolLimits(process.env.POSTGRES_PRISMA_URL)

if (!process.env.DATABASE_URL_UNPOOLED) {
  process.env.DATABASE_URL_UNPOOLED =
    process.env.DIRECT_URL || process.env.POSTGRES_URL_NON_POOLING || ""
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
