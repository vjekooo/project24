interface Props {
  description: string
}

export const About = ({ description }: Props) => {
  return (
    <div class="container px-3 py-8">
      <span class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl mb-8">
        About
      </span>

      <p class="mt-8 mb-8"></p>

      <p class="mb-8">{description}</p>
    </div>
  )
}
