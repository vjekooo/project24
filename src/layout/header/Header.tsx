import {
  type Component,
  createResource,
  createSignal,
  Show,
  useContext,
} from 'solid-js'
import Login from './Login'
import { A } from '@solidjs/router'
import { AppContext, User } from '../../index'
import { UserMenu } from '../../components/cards/userMenu/UserMenu'
import { SimpleCard } from '../../components/cards/simpleCard/SimpleCard'
import { $fetch } from '../../utils/fetch'
import { Register } from '../../pages/Register'

const userUrl = 'user'

async function fetchData(source, { value, refetching }): Promise<User> {
  const token = localStorage.getItem('token')
  if (!token) return
  return await $fetch<any, User>(userUrl).get()
}

const Header: Component = () => {
  const { state, setState } = useContext(AppContext)

  const [data, { mutate, refetch }] = createResource(fetchData)

  const [presentUserInfo, setPresentUserInfo] = createSignal(false)

  return (
    <div class="flex items-center justify-between">
      <A href="/">
        <div>Logo goes here</div>
      </A>
      <p class="text-4xl text-green-700 text-center py-20">This is a header</p>
      {data() && <div>{data().email}</div>}
      {!state.token ? (
        <>
          <Register />
          <Login />
        </>
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
