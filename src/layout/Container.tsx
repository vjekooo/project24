import { JSX } from 'solid-js'

interface Props {
  children: JSX.Element
}

export const Container = ({ children }: Props) => {
  return <div class="max-w-7xl mx-auto">{children}</div>
}
