<script setup lang="ts">
const props = defineProps<{
  title: string
  amount: number
  icon: string,
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
}>();

const colorScheme: {
  background: string,
  foreground: string,
  border: string
} = {
  background: 'bg-stone-50/10',
  foreground: 'text-white',
  border: 'border-white'
};

switch (props.color) {
  case 'primary':
    colorScheme.background = 'bg-primary/5';
    colorScheme.foreground = 'text-primary';
    colorScheme.border = 'border-primary';
    break;
  case 'secondary':
    colorScheme.background = 'bg-secondary/5';
    colorScheme.foreground = 'text-secondary';
    colorScheme.border = 'border-secondary';
    break;
  case 'success':
    colorScheme.background = 'bg-success/5';
    colorScheme.foreground = 'text-success';
    colorScheme.border = 'border-success';
    break;
  case 'warning':
    colorScheme.background = 'bg-warning/5';
    colorScheme.foreground = 'text-warning';
    colorScheme.border = 'border-warning';
    break;
  case 'error':
    colorScheme.background = 'bg-error/5';
    colorScheme.foreground = 'text-error';
    colorScheme.border = 'border-error';
    break;
  case 'info':
    colorScheme.background = 'bg-info/5';
    colorScheme.foreground = 'text-info';
    colorScheme.border = 'border-info';
    break;

  default:
    break;
}
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