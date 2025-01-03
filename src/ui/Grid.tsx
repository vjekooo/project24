import { JSX } from 'solid-js'

interface Props {
  children: JSX.Element
}

export const Grid = ({ children }: Props) => {
  return (
    <div class="w-full grid gap-6 mb-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {children}
    </div>
  )
}
