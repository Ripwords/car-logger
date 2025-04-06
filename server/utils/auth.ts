import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { drizzle } from "drizzle-orm/node-postgres"
import * as schema from "../database/schema"

const db = drizzle(process.env.NUXT_DATABASE_URL!, {
  schema,
})

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
})
