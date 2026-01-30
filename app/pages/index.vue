<script setup lang="ts">
import { useObservable } from '@vueuse/rxjs';
import { from } from 'rxjs';
import Dexie from 'dexie';

const { db } = useDb();
const totalIncome = useObservable(from(Dexie.liveQuery(async () => {
  const income = await db.transactions.where('type').equals('1').toArray();
  return income.reduce((sum, trx) => sum + Number(trx.amount), 0);
})));
const totalExpense = useObservable(from(Dexie.liveQuery(async () => {
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
      <DashboardCard title="Total Pemasukan" :amount="Number(totalIncome)" icon="i-lucide-banknote" color="success" />
      <DashboardCard title="Total Pengeluaran" :amount="Number(totalExpense)" icon="i-lucide-notepad-text" color="error" />
      <DashboardCard title="Saldo saat ini" :amount="Number(saldo)" icon="i-lucide-wallet" color="info" />
    </div>
  </NuxtLayout>
</template>