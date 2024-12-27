import { JSX } from 'solid-js'

interface Props {
  children: JSX.Element
}

export const Content = ({ children }: Props) => {
  return <div class="container mx-auto bg-white py-20">{children}</div>
}
