<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import appLogo from '@/assets/img/notely.webp';

const props = useAttrs();
const mainMenu: NavigationMenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'i-lucide-layout-grid',
    to: '/',
  },
  {
    label: 'Transactions',
    icon: 'i-lucide-house',
    to: '/transaction',
  },
];
</script>

<template>
  <UDashboardGroup>
    <UDashboardSidebar :collapsible="true" :resizable="true">
      <template #header="{collapsed}">
        <div class="flex items-center gap-2">
          <NuxtImg :src="appLogo" class="size-10" />
          <p class="font-bold">Notely</p>
        </div>
      </template>
      <template #default="{collapsed}">
        <UNavigationMenu :collapsed="collapsed" :items="mainMenu" orientation="vertical" />
      </template>
    </UDashboardSidebar>
    <UDashboardPanel>
      <template #header>
        <AppHeader :title="props.title as string"/>
      </template>
      <template #body>
        <slot />
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>