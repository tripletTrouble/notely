<script setup lang="ts">
import { computed } from 'vue'
import useConfirm from '~/composables/useConfirm.client'

const { state, accept, cancel, isOpen } = useConfirm()

const opts = computed(() => state.value?.options ?? {})
</script>

<template>
  <UModal v-if="state" v-model:open="isOpen">
    <template #content>
      <div class="p-5">
        <h3 class="text-2xl text-center w-full font-bold mb-3">{{ opts.title }}</h3>
        <p class="text-center">{{ opts.description || '' }}</p>
      </div>
      <div role="actions">
        <div class="p-5 flex gap-3 w-full">
          <UButton variant="subtle" color="neutral" class="w-full justify-center" @click="cancel">
            {{ opts.cancelText || 'Batal' }}
          </UButton>
          <UButton color="error" class="w-full justify-center" @click="accept">
            {{ opts.confirmText || 'Konfirmasi' }}
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>