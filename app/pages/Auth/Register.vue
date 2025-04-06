<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui"
import { z } from "zod"

const toast = useToast()
const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })
const state = reactive({
  email: "",
  password: "",
  confirmPassword: "",
})

const submitHandler = async (
  event: FormSubmitEvent<z.infer<typeof schema>>
) => {
  const user = await authClient.signUp.email({
    email: event.data.email,
    password: event.data.password,
    name: event.data.email,
  })
  if (!user.error) {
    toast.add({
      title: "Account created",
      description: "Please verify your email",
      color: "success",
    })
  } else {
    toast.add({
      title: "Error",
      description: `Registration failed: ${user.error.message}`,
      color: "error",
    })
  }
}
</script>

<template>
  <UtilCenter>
    <UCard class="w-full max-w-md">
      <template #header>
        <h1>Register</h1>
      </template>

      <UForm
        :schema
        :state
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

        <UFormField
          label="Confirm Password"
          name="confirmPassword"
        >
          <UInput
            v-model="state.confirmPassword"
            type="password"
          />
        </UFormField>

        <UButton type="submit">Register</UButton>
      </UForm>

      <template #footer>
        <p>
          Already have an account?
          <NuxtLink to="/auth/login">Login</NuxtLink>
        </p>
      </template>
    </UCard>
  </UtilCenter>
</template>
