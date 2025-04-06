import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { passkey } from "better-auth/plugins/passkey"
import { drizzle } from "drizzle-orm/node-postgres"
import * as schema from "../../shared/database/schema"

const db = drizzle(process.env.NUXT_DATABASE_URL!, {
  schema,
})

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    requireUniqueEmail: true,
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        name: user.email,
        from: user.email,
        subject: "Verify your email address",
        content: `Click the link to verify your email: ${url}`,
      })
    },
  },
  plugins: [passkey()],
})
