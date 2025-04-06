import { createSelectSchema } from "drizzle-zod"
import type { z } from "zod"
import { user } from "~~/server/database/schema"

export const zUser = createSelectSchema(user)
export type User = z.infer<typeof zUser>
