export function checkEnv(env: NodeJS.ProcessEnv) {
  const required = [
    "BETTER_AUTH_SECRET",
    "BETTER_AUTH_URL",
    "NUXT_DATABASE_URL",
    "NUXT_BREVO_KEY",
  ]

  const missing = required.filter((key) => !env[key])

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    )
  }
}
