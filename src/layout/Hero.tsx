import { JSX } from 'solid-js'
import { Stack } from '../ui/Stack'

interface Props {
  name: string
  image: string
  action?: JSX.Element
}

export const Hero = ({ name, image, action }: Props) => {
  return (
    <section
      class="w-full mx-auto bg-nordic-gray-light flex p-12 md:pt-0 items-end bg-cover bg-right"
      style={`max-width:1600px; height: 32rem; background-image: url('${image}');`}
    >
      <div class="flex flex-col justify-center items-start p-6 tracking-wide bg-white opacity-50">
        <Stack gap={3}>
          <h1 class="text-black h1">{name}</h1>
          {action && <div>{action}</div>}
        </Stack>
      </div>
    </section>
  )
}
