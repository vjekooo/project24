import { JSX } from 'solid-js'

interface Props {
  gap?: number
  children: JSX.Element
}

export const Stack = ({ gap = 1, children }: Props) => (
  <div class={`flex flex-col gap-${gap}`}>{children}</div>
)
