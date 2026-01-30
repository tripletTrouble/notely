<script setup lang="ts">
import { useObservable } from '@vueuse/rxjs';
import { from } from 'rxjs';
import Dexie from 'dexie';

const { db } = useDb();
const isOpen = useState<boolean>('transaction-dialog-open', () => false);
// keep live count as before
const totalTransactions = useObservable(from(Dexie.liveQuery(async () => {
  return db.transactions.count();
})));
const totalPage = computed(() => Math.ceil((totalTransactions.value || 0) / 10));
const currentPage = useState<number>('transaction-current-page', () => 1);

// persistent array — append new pages instead of replacing the whole list
const transactions = useState<Transaction[]>('transactions', () => []);
// keep a reactive full list from the DB so updates are live
const fullTransactions = useState<Transaction[]>('full-transactions', () => []);
const selectedTrx = useState<Transaction | undefined>('selected-transaction', () => undefined);

const loadPage = async (page = currentPage.value) => {
  if (isLoading.value) return;
  isLoading.value = true;
  try {
    // take slice from the live `fullTransactions` list
    const start = (page - 1) * 10;
    const items = fullTransactions.value.slice(start, start + 10);

    // dedupe before appending
    const existingIds = new Set(transactions.value.map(t => t.id));
    transactions.value.push(...items.filter(i => !existingIds.has(i.id)));
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  // initial load
  loadPage(1);
  // subscribe to live DB changes and keep fullTransactions in sync
  const sub = Dexie.liveQuery(async () => {
    return db.transactions.orderBy('id').reverse().toArray();
  }).subscribe({
    next(list: Transaction[]) {
      // update full list
      fullTransactions.value = list;
      // if we've already loaded pages, ensure transactions contains first N items
      const needed = currentPage.value * 10;
      const slice = list.slice(0, needed);
      // replace persisted `transactions` with deduped slice while preserving order
      transactions.value = slice;
    }
  });

  // store subscription so it can be cleaned up on unmount
  (useState('_transactions_live_sub', () => ({ unsub: () => sub.unsubscribe() })) as any).value.unsub = () => sub.unsubscribe();
});

// intersection observer for infinite scroll
const loadMoreEl = useState<HTMLElement | null>('load-more-el', () => null);
const isLoading = useState<boolean>('is-loading', () => false);
const showLoad = computed(() => currentPage.value < totalPage.value);
let observer: IntersectionObserver | null = null;

const attachObserver = () => {
  if (!loadMoreEl.value) return;
  if (observer) observer.disconnect();
  observer = new IntersectionObserver((entries) => {
    const e = entries[0];
    if (e && e.isIntersecting && !isLoading.value && currentPage.value < totalPage.value) {
      handleLoad();
    }
  }, { root: null, rootMargin: '200px', threshold: 0.1 });
  observer.observe(loadMoreEl.value);
};

watch(showLoad, async (val) => {
  if (val) {
    await nextTick();
    attachObserver();
  } else if (observer) {
    observer.disconnect();
    observer = null;
  }
});

onUnmounted(() => {
  if (observer) observer.disconnect();
  const s = (useState('_transactions_live_sub') as any).value;
  if (s && typeof s.unsub === 'function') s.unsub();
});

const handleClick = (trx: Transaction) => {
  if (selectedTrx.value?.id === trx.id) {
    selectedTrx.value = undefined;
  } else {
    selectedTrx.value = trx;
  }
};

const handleLoad = async () => {
  if (currentPage.value < totalPage.value) {
    currentPage.value += 1;
    await loadPage(currentPage.value);
  }
};
</script>

<template>
  <NuxtLayout name="default" title="Transaksi">
    <div class="mb-4">
      <h1 class="text-lg font-bold">Daftar Transaksi</h1>
      <p>Daftar semua transaksi periode ini.</p>
    </div>
    <TransactionsCard v-for="trx in transactions" :key="trx.id" :title="trx.title" :date="new Date(trx.date)"
      :amount="Number(trx.amount)" :type="trx.type as '1' | '2'" @click="handleClick(trx)"
      :selected="selectedTrx?.id === trx.id" />
    <UButton icon="i-lucide-plus" class="fixed bottom-6 right-6 rounded-full" size="xl" @click="isOpen = true" />

    <div class="flex justify-center" v-if="currentPage < totalPage" ref="loadMoreEl">
      <div class="sr-only" >Lebih banyak...</div>
    </div>
    <TransactionsDialog v-model:is-open="isOpen" />
    <TransactionsDrawer v-model:transaction="selectedTrx" />
  </NuxtLayout>
</template>