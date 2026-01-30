<script setup lang="ts">
const { db } = useDb();
const { confirm } = useConfirm();
const toast = useToast();
const transaction = defineModel<Transaction>('transaction')
const isOpen = computed({
  get: () => !!transaction.value,
  set: (v: boolean) => {
    if (!v) transaction.value = undefined;
  }
});
const description = computed(() => {
  return `${new Date(transaction.value?.date || '').toLocaleDateString('id-ID')} - ${transaction.value?.type === '1' ? 'Pemasukan' : 'Pengeluaran'}`;
});
const handleDelete = async () => {
  const deletedTrx = transaction.value;
  isOpen.value = false;

  if (!deletedTrx) return;

  confirm({
    title: 'Hapus transaksi',
    description: 'Apakah Anda yakin ingin menghapus transaksi ini? Tindakan ini tidak dapat dibatalkan.',
    confirmText: 'Hapus',
    cancelText: 'Batal',
  }).then(async (confirmed) => {
    if (confirmed && deletedTrx) {
      await db.transactions.delete(deletedTrx.id);
      toast.add({
        title: 'Transaksi dihapus',
        description: 'Transaksi berhasil dihapus.',
        icon: 'i-lucide-circle-check-big',
        color: 'success',
      });
      isOpen.value = false;
    }
  });
}
</script>

<template>
  <UDrawer v-if="transaction" v-model:open="isOpen" :title="transaction.title" :description="description">
    <template #body>
      <div class="grid grid-cols-[1fr_1fr] gap-4 pb-1 border-b mb-3">
        <p>Rincian</p>
        <p>{{ transaction.description }}</p>
      </div>
      <div class="grid grid-cols-[1fr_1fr] gap-4 pb-1 border-b mb-3">
        <p>Total transaksi</p>
        <p class="font-bold" :class="transaction.type === '1' ? 'text-success' : 'text-error'">{{
          Number(transaction.amount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) }}</p>
      </div>
    </template>
    <template #footer>
      <div class="grid grid-cols-2 gap-4">
        <UButton color="error" class="w-full justify-center" icon="i-lucide-trash" size="lg" @click="handleDelete">Hapus
        </UButton>
        <UButton color="neutral" variant="subtle" class="w-full justify-center" icon="i-lucide-x" size="lg"
          @click="isOpen = false">Tutup</UButton>
      </div>
    </template>
  </UDrawer>
</template>