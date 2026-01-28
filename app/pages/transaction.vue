<script setup lang="ts">
import { useObservable } from '@vueuse/rxjs';
import { from } from 'rxjs';
import { liveQuery } from 'dexie';

const { db } = useDb();
const isOpen = useState<boolean>('transaction-dialog-open', () => false);
const totalTransactions = useObservable(from(liveQuery(async () => {
  return db.transactions.count();
})));
const totalPage = computed(() => Math.ceil((totalTransactions.value || 0) / 5));
const currentPage = useState<number>('transaction-current-page', () => 1);
let transactions = useObservable(from(liveQuery(() => db.transactions.offset((currentPage.value - 1) * 5).limit(5).toArray())));

watch(currentPage, (newValue) => {
  // Trigger re-fetching transactions when the current page changes
  transactions = useObservable(from(liveQuery(() => db.transactions.offset((newValue - 1) * 5).limit(5).toArray())));  
});
</script>

<template>
  <NuxtLayout name="default" title="Transaksi">
    <div v-for="trx in transactions" :key="trx.id" class="p-3 border rounded-lg">
      <div class="flex justify-between">
        <p class="font-semibold">{{ trx.title }}</p>
        <UBadge variant="outline" :color="trx.type === '1' ? 'success' : 'error'"
          :label="trx.type === '1' ? 'Pemasukan' : 'Pengeluaran'" />
      </div>
      <p class="text-sm text-muted">{{ new Date(trx.date).toLocaleDateString() }}</p>
      <p class="text-lg font-bold mt-2">{{ Number(trx.amount).toLocaleString('id-ID', {
        style: 'currency', currency:
          'IDR' }) }}</p>
    </div>
    <div id="pagination" class="flex justify-center">
      <UPagination v-if="totalPage > 1" v-model:page="currentPage" :total="totalTransactions" :items-per-page="5" class="my-4" />
    </div>
    <UButton icon="i-lucide-plus" class="fixed bottom-6 right-6 rounded-full" size="xl" @click="isOpen = true" />

    <TransactionsDialog v-model:is-open="isOpen" />
  </NuxtLayout>
</template>