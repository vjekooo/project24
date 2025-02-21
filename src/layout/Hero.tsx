import { JSX } from 'solid-js'
import { Stack } from '../ui/Stack'

interface Props {
  name: string
  image: string
  action?: JSX.Element
}

export const Hero = (props: Props) => {
  return (
    <section
      class="w-full mx-auto bg-nordic-gray-light flex p-12 md:pt-0 items-end bg-cover bg-right"
      style={`max-width:1600px; height: 32rem; background-image: url('${props.image}');`}
    >
      <div class="flex flex-col justify-center items-start p-6 tracking-wide bg-white opacity-50">
        <Stack>
          <h1 class="text-black h1">{props.name}</h1>
          <div>{props.action || ''}</div>
        </Stack>
      </div>
    </section>
  )
}
