<script setup lang="ts">
const {$pwa} = useNuxtApp();

useHead({
  title: 'Notely',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  link: [
    { rel: 'icon', type: 'image/webp', href: '/notely.webp' },
    { rel: 'apple-touch-icon', type: 'image/webp', href: '/apple-touch-icon.webp' },
  ],
})
const toaster: { position: "top-right" } = { position: 'top-right' };

onMounted(() => {
  console.log('PWA is enabled:', $pwa);
});
</script>

<template>
  <NuxtPwaManifest/>
  <UApp :toaster="toaster">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </UApp>
</template>
