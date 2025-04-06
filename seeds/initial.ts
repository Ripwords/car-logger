import { drizzle } from "drizzle-orm/node-postgres"
import { eq } from "drizzle-orm"
import { user } from "../shared/database/schema"

const db = drizzle(process.env.NUXT_DATABASE_URL!)

async function main() {
  const testUser: typeof user.$inferInsert = {
    id: "1",
    name: "John",
    email: "john@example.com",
    emailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  await db.insert(user).values(testUser)
  console.log("New user created!")

  const selectedUsers = await db.select().from(user)
  console.log("Getting all users from the database: ", selectedUsers)
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */

  await db
    .update(user)
    .set({
      name: "John Doe",
    })
    .where(eq(user.email, testUser.email))
  console.log("User info updated!")
}

main()
