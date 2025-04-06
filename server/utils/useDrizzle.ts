import { drizzle } from "drizzle-orm/node-postgres"
import * as schema from "../database/schema"
export { sql, eq, and, or } from "drizzle-orm"
const config = useRuntimeConfig()

export const tables = schema

export function useDrizzle() {
  return drizzle(config.databaseUrl, { schema })
}
