import { JSX } from 'solid-js'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: JSX.Element
}

export const Modal = (props: ModalProps) => {
  return (
    <div
      class={`fixed inset-0 flex items-center justify-center z-20 ${
        props.isOpen ? 'block' : 'hidden'
      }`}
    >
      <div
        class="fixed inset-0 bg-black opacity-60 z-30"
        onClick={props.onClose}
      ></div>

      <div class="bg-white p-6 rounded shadow-lg z-50 flex flex-col w-full max-w-md">
        <div class="flex items-center justify-between mb-8">
          <div>{props.title && <h1 class="h3">{props.title}</h1>}</div>
          <div class="cursor-pointer self-end" onClick={props.onClose}>
            &#x2715;
          </div>
        </div>
        <div>{props.children}</div>
      </div>
    </div>
  )
}
