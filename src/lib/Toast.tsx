import { createSignal, Show } from 'solid-js'

export function Toast() {
  const [visible, setVisible] = createSignal(false)
  const [message, setMessage] = createSignal('')

  const showToast = (msg: string, duration = 3000) => {
    setMessage(msg)
    setVisible(true)
    setTimeout(() => setVisible(false), duration)
  }

  return {
    ToastComponent: () => (
      <Show when={visible()}>
        <div
          class="fixed top-4 right-4 bg-gray-700 text-white py-2 px-4 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in-out"
          role="alert"
        >
          <span>{message()}</span>
        </div>
      </Show>
    ),
    showToast,
  }
}
