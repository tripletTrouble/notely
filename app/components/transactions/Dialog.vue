<script setup lang="ts">
import { CalendarDate, getLocalTimeZone } from '@internationalized/date';
import * as z from 'zod';

const { db } = useDb();
const toast = useToast();
const schema = z.object({
  type: z.enum(['1', '2'], 'Jenis transaksi harus dipilih'),
  date: z.date('Tanggal transaksi harus diisi'),
  title: z.string().min(1, 'Judul transaksi harus diisi'),
  description: z.string().optional(),
  amount: z.number('Jumlah transaksi harus diisi').min(0, 'Jumlah transaksi tidak boleh negatif')
});
type Schema = z.output<typeof schema>;
const isOpen = defineModel<boolean>('isOpen');
const isCalendarOpen = useState<boolean>('transaction-dialog-calendar-open', () => false);
const calendarValue = useState<any>('transaction-dialog-calendar-value', () => null);
const transaction = reactive<Partial<Schema>>({
  type: undefined,
  date: new Date(),
  title: '',
  description: '',
  amount: 0
})
const handleSave = () => {
  // Here you would typically send the transaction data to your backend or store it
  db.transactions.add({
    type: transaction.type as string,
    date: transaction.date?.toISOString() as string,
    title: transaction.title as string,
    description: transaction.description,
    amount: Number(transaction.amount)
  }).then(res => {
    toast.add({
      title: 'Sukses',
      description: 'Transaksi berhasil disimpan.',
      icon: 'i-lucide-circle-check-big',
      color: 'success'
    });
  })

  // Reset the form
  transaction.type = undefined;
  transaction.date = new Date();
  transaction.title = '';
  transaction.description = '';
  transaction.amount = 0;
  calendarValue.value = null;
  isOpen.value = false;
}
const form = useTemplateRef('form');

watch(calendarValue, (newValue) => {
  if (newValue) {
    const selectedDate = newValue as CalendarDate;
    transaction.date = selectedDate.toDate(getLocalTimeZone());

    isCalendarOpen.value = false;
  } else {
    transaction.date = undefined;
  }
});
</script>

<template>
  <UModal v-model:open="isOpen" title="Catat transaksi" description="Catat transaksi baru Anda di sini.">
    <template #body>
      <UForm :schema="schema" @submit="handleSave" :state="transaction" ref="form">
        <div class="space-y-3">
          <div class="grid grid-cols-2 gap-2">
            <UFormField label="Jenis transaksi" name="type" required>
              <USelect class="w-full" v-model="transaction.type" :items="[
                { label: 'Pemasukan', value: '1' },
                { label: 'Pengeluaran', value: '2' }
              ]" placeholder="Pilih jenis transaksi" required />
            </UFormField>
            <UFormField label="Tanggal transaksi" name="date" required>
              <UPopover v-model:open="isCalendarOpen">
                <UButton variant="outline" color="neutral" class="w-full justify-between">
                  <span :class="transaction.date ? '' : 'text-muted'">{{ transaction.date ?
                    transaction.date.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })
                    :
                    'Pilih tanggal' }}</span>
                  <UIcon name="i-lucide-calendar" />
                </UButton>
                <template #content>
                  <UCalendar selection-mode="single" v-model:model-value="calendarValue" />
                </template>
              </UPopover>
            </UFormField>
          </div>
          <UFormField label="Judul transaksi" name="title" required>
            <UInput type="text" class="w-full" placeholder="Cth: Makan siang" v-model="transaction.title" required />
          </UFormField>
          <UFormField label="Deskripsi" name="description">
            <UTextarea class="w-full" :rows="2" placeholder="Cth: makan siang: 12000, jajan: 5000"
              v-model="transaction.description" />
          </UFormField>
          <UFormField label="Jumlah transaksi" name="amount" required>
            <UInput type="number" class="w-full" placeholder="Cth: 50000" v-model="transaction.amount" required />
          </UFormField>
        </div>
      </UForm>
    </template>
    <template #footer>
      <div class="flex justify-end gap-2 w-full">
        <UButton variant="outline" color="neutral" @click="isOpen = false" icon="i-lucide-x">Batal</UButton>
        <UButton color="primary" icon="i-lucide-save" @click="form?.submit">Simpan</UButton>
      </div>
    </template>
  </UModal>
</template>