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
      class={`fixed inset-0 flex items-center justify-center ${
        props.isOpen ? 'block' : 'hidden'
      }`}
    >
      <div
        class="fixed inset-0 bg-black opacity-50"
        onClick={props.onClose}
      ></div>

      <div class="bg-white p-6 rounded shadow-lg z-10 flex flex-col">
        <div class="flex items-center justify-between mb-8">
          {props.title && <h1 class="text-2xl">{props.title}</h1>}
          <div class="cursor-pointer self-end" onClick={props.onClose}>
            X
          </div>
        </div>
        <div>{props.children}</div>
      </div>
    </div>
  )
}
