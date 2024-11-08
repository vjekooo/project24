import {
  type Component,
  createResource,
  createSignal,
  Show,
  useContext,
} from 'solid-js'
import Login from './Login'
import { A } from '@solidjs/router'

import { AppContext } from '../../index'
import { UserMenu } from '../../components/cards/userMenu/UserMenu'
import { SimpleCard } from '../../components/cards/simpleCard/SimpleCard'
import { $fetch } from '../../utils/fetch'
import { Register } from '../../pages/Register'
import { User } from '../../types'

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
      {!state.token ? (
        <>
          <Register />
          <Login />
        </>
      ) : (
        <div class="relative">
          <div onClick={() => setPresentUserInfo(!presentUserInfo())}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width={1.5}
              stroke="currentColor"
              // @ts-ignore
              className="size-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>
          <Show when={presentUserInfo()}>
            <div class="absolute">
              <SimpleCard>
                <UserMenu user={data()} />
              </SimpleCard>
            </div>
          </Show>
        </div>
      )}
    </div>
  )
}

export default Header
