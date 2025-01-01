import { JSX } from 'solid-js'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
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
        <div class="cursor-pointer self-end mb-8" onClick={props.onClose}>
          X
        </div>
        <div>{props.children}</div>
      </div>
    </div>
  )
}
