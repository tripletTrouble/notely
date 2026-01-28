<script setup lang="ts">
useHead({
  title: 'Notely',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  link: [
    { rel: 'icon', type: 'image/webp', href: '/notely.webp' },
  ],
})
const toaster: { position: "top-right" } = { position: 'top-right' }
</script>

<template>
  <UApp :toaster="toaster">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </UApp>
</template>
