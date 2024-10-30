import { useContext, type Component, createSignal, Show } from 'solid-js'
import Login from './Login'
import { A } from '@solidjs/router'
import { AppContext } from '../../index'
import { UserMenu } from '../../components/cards/userMenu/UserMenu'
import { SimpleCard } from '../../components/cards/simpleCard/SimpleCard'

const Header: Component = () => {
  const { state } = useContext(AppContext)

  const [presentUserInfo, setPresentUserInfo] = createSignal(false)

  return (
    <div class="flex items-center justify-between">
      <A href="/">
        <div>Logo goes here</div>
      </A>
      <p class="text-4xl text-green-700 text-center py-20">This is a header</p>
      {!state.user.token ? (
        <Login />
      ) : (
        <div class="relative">
          <div onClick={() => setPresentUserInfo(!presentUserInfo())}>User</div>
          <Show when={presentUserInfo()}>
            <div class="absolute">
              <SimpleCard>
                <UserMenu />
              </SimpleCard>
            </div>
          </Show>
        </div>
      )}
    </div>
  )
}

export default Header
