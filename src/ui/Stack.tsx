import { JSX } from 'solid-js'

interface Props {
  gap?: number
  horizontal?: boolean
  children: JSX.Element
}

export const Stack = ({ gap = 1, horizontal = false, children }: Props) => (
  <div class={`flex ${horizontal ? 'flex-row' : 'flex-col'} gap-${gap}`}>
    {children}
  </div>
)
