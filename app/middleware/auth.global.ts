export default defineNuxtRouteMiddleware(async (to) => {
  const { data: session } = await authClient.useSession(useFetch)
  const isAuthRoute = to.path.startsWith("/auth")

  if (!session.value && !isAuthRoute) {
    return navigateTo("/auth/login")
  } else if (session.value && isAuthRoute) {
    if (to.path.startsWith("/auth")) {
      return navigateTo("/")
    }

    navigateTo(to.path)
  }
})
