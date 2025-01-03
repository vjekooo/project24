interface Props {
  description: string
}

export const About = ({ description }: Props) => {
  return (
    <div>
      <span class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl mb-8">
        About
      </span>

      <p class="mt-8 mb-8"></p>

      <p class="mb-8">{description}</p>
    </div>
  )
}
