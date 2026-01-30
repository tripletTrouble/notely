import { ref, readonly } from 'vue'

export type ConfirmOptions = {
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
}

const isOpen = ref<boolean>(false)

type ConfirmRequest = {
  id: number
  options: ConfirmOptions
  resolve: (value: boolean) => void
}

const queue: ConfirmRequest[] = []
const current = ref<ConfirmRequest | null>(null)
let lastId = 0

function process() {
  if (!current.value && queue.length > 0) {
    current.value = queue.shift() || null
  }
}

export function useConfirm() {
  function confirm(options: ConfirmOptions = {}) {
    isOpen.value = true;
    return new Promise<boolean>((resolve) => {
      const req: ConfirmRequest = { id: ++lastId, options, resolve }
      queue.push(req)
      process()
    })
  }

  function accept() {
    if (!current.value) return
    const r = current.value
    current.value = null
    isOpen.value = false;
    r.resolve(true)
    // next
    process()
  }

  function cancel() {
    if (!current.value) return
    const r = current.value
    current.value = null
    isOpen.value = false;
    r.resolve(false)
    // next
    process()
  }

  return {
    confirm,
    accept,
    cancel,
    state: readonly(current),
    isOpen
  }
}

export default useConfirm
