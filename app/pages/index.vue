<script setup lang="ts">
useHead({
  title: 'Notely - Dashboard',
});
</script>

<template>
  <NuxtLayout name="default" title="Dashboard">
    <UAlert color="neutral" variant="subtle" title="Mulai mencatat!"
      description="Jangan lupa mencatat setiap hari."
      icon="i-lucide-rocket"
      orientation="horizontal"
      :actions="[
        {
          label: 'Mulai!',
          to: '/transaction'
        }
      ]"
      :ui="{
        icon: 'size-10',
      }"
       />
  </NuxtLayout>
</template>