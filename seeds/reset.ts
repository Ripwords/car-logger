// path to a file with schema you want to reset
import { drizzle } from "drizzle-orm/node-postgres"
import * as schema from "../server/database/schema"
import { reset } from "drizzle-seed"

async function main() {
  const db = drizzle(process.env.NUXT_DATABASE_URL!)
  await reset(db, schema)
}

main()
