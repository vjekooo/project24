import { JSX } from 'solid-js'

interface Props {
  name: string
  action?: JSX.Element
}

export const Hero = ({ name, action }: Props) => {
  console.log(name)
  return (
    <section
      class="w-full mx-auto bg-nordic-gray-light flex pt-12 md:pt-0 md:items-center bg-cover bg-right"
      style="max-width:1600px; height: 32rem; background-image: url('https://images.unsplash.com/photo-1422190441165-ec2956dc9ecc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80');"
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
