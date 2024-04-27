import { createSignal, type Component, Show } from 'solid-js'
import { SimpleCard } from '../../components/cards/simpleCard/SimpleCard'
import { A } from '@solidjs/router'

const Login: Component = () => {
  const [presentCard, setPresentCard] = createSignal(false)

  return (
    <div class="relative">
      <A href="/register">
        <button class="btn btn-primary">Register</button>
      </A>
      <button
        class="btn btn-primary"
        onClick={() => setPresentCard(!presentCard())}
      >
        Login
      </button>
      <Show when={presentCard()}>
        <div class="absolute">
          <SimpleCard />
        </div>
      </Show>
    </div>
  )
}

export default Login
