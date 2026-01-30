<script setup lang="ts">
const props = defineProps<{
  title: string;
  date: Date;
  amount: number;
  type: '1' | '2';
  selected?: boolean
}>();
const { resolveColor } = useColorcheme();
const colorScheme = resolveColor(props.type === '1' ? 'success' : 'error');
const bg = props.type === '1' ? 'to-green-500/20' : 'to-rose-500/20';
</script>

<template>
  <div :class="`${bg} ${colorScheme.border}`"
    class="bg-linear-to-r p-4 border-l-4 rounded-l-md rounded-r-xl flex items-center gap-4 justify-between">
    <div role="detail" class="w-full">
      <div class="font-semibold mb-1.5 text-sm flex gap-2">
        <span class="text-muted">{{ date.toLocaleDateString('id-ID') }}</span>
        <span>-</span>
        <span class="line-clamp-1">{{ title }}</span>
      </div>
      <p :class="colorScheme.foreground" class="font-bold">
        <span>{{ type === '1' ? '+' : '-' }}</span>
        {{ amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) }}
      </p>
    </div>
    <div role="indicator" class="size-8 rounded-full bg-muted/30 flex items-center justify-center" >
      <UIcon name="i-lucide-check" class="size-5 text-info" v-if="selected" />
    </div>
  </div>
</template>