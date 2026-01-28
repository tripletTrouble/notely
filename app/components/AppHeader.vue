<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: false,
    default: undefined,
  }
});
</script>

<template>
  <UDashboardNavbar :title="title">
    <template #leading>
      <UDashboardSidebarCollapse />
    </template>
  </UDashboardNavbar>
</template>