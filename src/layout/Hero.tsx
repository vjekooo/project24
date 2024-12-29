import { JSX } from 'solid-js'

interface Props {
  name: string
  image: string
  action?: JSX.Element
}

export const Hero = ({ name, image, action }: Props) => {
  return (
    <section
      class="w-full mx-auto bg-nordic-gray-light flex pt-12 md:pt-0 md:items-center bg-cover bg-right"
      style={`max-width:1600px; height: 32rem; background-image: url('${image}');`}
    >
      <div class="container mx-auto">
        <div class="flex flex-col w-full lg:w-1/2 justify-center items-start  px-6 tracking-wide">
          <h1 class="text-black text-2xl my-4">{name}</h1>
          {action && action}
        </div>
      </div>
    </section>
  )
}
