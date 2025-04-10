<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui"
import { z } from "zod"

const toast = useToast()

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
const state = reactive({
  email: "",
  password: "",
})

const submitHandler = async (
  event: FormSubmitEvent<z.infer<typeof schema>>
) => {
  const user = await authClient.signIn.email({
    email: event.data.email,
    password: event.data.password,
  })
  if (!user.error) {
    toast.add({
      title: "Login successful",
      description: "You have been logged in",
      color: "success",
    })
    navigateTo("/")
  } else {
    toast.add({
      title: "Login failed",
      description: user.error.message,
      color: "error",
    })
  }
}
</script>

<template>
  <UtilCenter>
    <UCard class="w-full max-w-md">
      <template #header>
        <h1>Login</h1>
      </template>

      <UForm
        :state
        :schema
        class="space-y-4"
        @submit="submitHandler"
      >
        <UFormField
          label="Email"
          name="email"
        >
          <UInput v-model="state.email" />
        </UFormField>
        <UFormField
          label="Password"
          name="password"
        >
          <UInput
            v-model="state.password"
            type="password"
          />
        </UFormField>
        <UButton type="submit">Login</UButton>
      </UForm>
      <template #footer>
        <p class="text-sm text-gray-500">
          Don't have an account? <a href="/auth/register">Register</a>
        </p>
      </template>
    </UCard>
  </UtilCenter>
</template>
