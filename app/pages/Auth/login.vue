<script lang="ts" setup></script>

<template>
  <div>
    <UCard>
      <template #header>
        <h1>Login</h1>
      </template>

      <USkeleton class="h-32" />
      <UButton>Login</UButton>

      <template #footer>
        <USkeleton class="h-8" />
      </template>
    </UCard>
  </div>
</template>
