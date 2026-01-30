<script setup lang="ts">
const props = defineProps<{
  title: string
  amount: number
  icon: string,
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
}>();
const {resolveColor} = useColorcheme();
const colorScheme = resolveColor(props.color || 'primary');
</script>

<template>
  <div class="flex gap-4 items-center rounded-lg p-5" :class="colorScheme.background">
    <div class="rounded-full size-16 shadow-md" :class="colorScheme.background + ' flex items-center justify-center'">
      <UIcon :name="icon" class="size-9" :class="colorScheme.foreground" />
    </div>
    <USeparator orientation="vertical" :ui="{
      border: colorScheme.border,
      root: 'h-14',
    }" />
    <div class="space-y-2" :class="colorScheme.foreground">
      <p class="font-medium">{{ title }}</p>
      <p class="text-xl font-bold">{{ amount.toLocaleString('id-ID', { trailingZeroDisplay: 'stripIfInteger', style: 'currency', currency: 'IDR' }) }}</p>
    </div>
  </div>
</template>