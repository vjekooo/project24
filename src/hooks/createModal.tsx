import { JSX, Show, createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'

interface ModalProps {
  children: JSX.Element
}

export const createModal = () => {
  const [open, setOpen] = createSignal(false)

  return {
    openModal() {
      setOpen(true)
    },
    closeModal() {
      setOpen(false)
    },
    Modal({ children }: ModalProps) {
      return (
        <Portal>
          <Show when={open()} fallback={null}>
            {(open) => (
              <div class="fixed inset-0 flex items-center justify-center">
                <div
                  class="fixed inset-0 bg-black opacity-50"
                  onClick={() => setOpen(false)}
                />
                <div class="bg-white p-6 rounded shadow-lg z-10 flex flex-col">
                  <div
                    class="cursor-pointer self-end mb-8"
                    onClick={() => setOpen(false)}
                  >
                    X
                  </div>
                  <div>{children}</div>
                </div>
              </div>
            )}
          </Show>
        </Portal>
      )
    },
  }
}
