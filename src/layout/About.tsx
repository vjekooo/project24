import { JSX, Show } from 'solid-js'
import { Stack } from '../ui/Stack'

interface Props {
  description: string
  address: JSX.Element
}

export const About = (props: Props) => {
  return (
    <div class="container px-3 py-8">
      <Stack size="lg">
        <span class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl">
          About
        </span>
        <p>{props.description}</p>
        <Show when={props.address} fallback={'No address'}>
          {props.address}
        </Show>
      </Stack>
    </div>
  )
}
