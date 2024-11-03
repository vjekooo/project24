import { createSignal, type Component, Show, useContext } from 'solid-js'
import { A } from '@solidjs/router'

import { SimpleCard } from '../../components/cards/simpleCard/SimpleCard'
import { LoginForm } from '../../components/forms/loginForm/LoginForm'
import { AppContext } from '../../index'

const Login: Component = () => {
  const { state, setState } = useContext(AppContext)

  const [presentCard, setPresentCard] = createSignal(false)

  return (
    <div class="relative">
      {state.token ? (
        <div class="flex flex-col gap-2">Logged in as {state.user.email}</div>
      ) : (
        <>
          <A href="/register">
            <button class="btn btn-primary">Register</button>
          </A>
          <button
            class="btn btn-primary"
            onClick={() => setPresentCard(!presentCard())}
          >
            Login
          </button>
        </>
      )}

      <Show when={presentCard()}>
        <div class="absolute">
          <SimpleCard>
            <LoginForm />
          </SimpleCard>
        </div>
      </Show>
    </div>
  )
}

export default Login
