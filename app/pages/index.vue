<script setup lang="ts">
import { useObservable } from '@vueuse/rxjs';
import { from } from 'rxjs';
import { liveQuery } from 'dexie';

const { db } = useDb();
const totalIncome = useObservable(from(liveQuery(async () => {
  const income = await db.transactions.where('type').equals('1').toArray();
  return income.reduce((sum, trx) => sum + Number(trx.amount), 0);
})));
const totalExpense = useObservable(from(liveQuery(async () => {
  const income = await db.transactions.where('type').equals('2').toArray();
  return income.reduce((sum, trx) => sum + Number(trx.amount), 0);
})));
const saldo = computed(() => {
  return (totalIncome.value || 0) - (totalExpense.value || 0);
});

useHead({
  title: 'Notely - Dashboard',
});
</script>

<template>
  <NuxtLayout name="default" title="Dashboard">
    <UAlert color="neutral" variant="subtle" title="Mulai mencatat!" description="Jangan lupa mencatat setiap hari."
      icon="i-lucide-rocket" orientation="horizontal" :actions="[
        {
          label: 'Mulai!',
          to: '/transaction'
        }
      ]" :ui="{
        icon: 'size-10',
      }" />
    <div class="grid space-y-4">
      <UCard>
        <template #header>
          <p class="font-bold text-lg">Total Pemasukan</p>
        </template>
        <template #default>
          <p class="font-bold text-xl">{{ Number(totalIncome || 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) }}</p>
        </template>
      </UCard>
      <UCard>
        <template #header>
          <p class="font-bold text-lg">Total Pengeluaran</p>
        </template>
        <template #default>
          <p class="font-bold text-xl">{{ Number(totalExpense || 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) }}</p>
        </template>
      </UCard>
      <UCard>
        <template #header>
          <p class="font-bold text-lg">Saldo saat ini</p>
        </template>
        <template #default>
          <p class="font-bold text-xl">{{ Number(saldo || 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) }}</p>
        </template>
      </UCard>
    </div>
  </NuxtLayout>
</template>