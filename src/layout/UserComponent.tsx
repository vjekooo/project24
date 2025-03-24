import { Stack } from '~/ui/Stack'
import { $fetch, FetchData } from '~/utils/fetch'
import { MessageResponse, User } from '~/types'
import { createEffect, createResource, createSignal } from 'solid-js'
import { useAppState } from '~/context'
import { Modal } from '~/components/modal/Modal'
import { LoginForm } from '~/components/forms/loginForm/LoginForm'
import { RegisterForm } from '~/components/forms/registerForm/RegisterForm'

const url = 'user'

const fetchUserInfo = async () => {
  try {
    return await $fetch<{}, User>(url).get()
  } catch (e) {
    console.log(e)
  }
}

const logout = async () => {
  const fullUrl = `auth/logout`
  return await $fetch<{}, MessageResponse>(fullUrl).get()
}

export default function UserComponent() {
  const [_, { updateUser, updateIsAuthenticated }] = useAppState()

  const [presentSignIn, setPresentSignIn] = createSignal(false)
  const [formType, setFormType] = createSignal('login')

  const [user] = createResource(fetchUserInfo)
  const [presentUserMenu, setPresentUserMenu] = createSignal(false)

  const logOut = () => {
    logout().then(() => {
      window.location.reload()
    })
  }

  const updateUserState = (user: FetchData<User> | undefined) => {
    if (user?.data?.email) {
      updateUser(user?.data as User)
      updateIsAuthenticated(true)
    }
  }

  createEffect(() => updateUserState(user()))

  return (
    <div>
      <Modal
        isOpen={presentSignIn()}
        onClose={() => setPresentSignIn(false)}
        title={formType() === 'login' ? 'Sign in' : 'Register'}
      >
        {formType() === 'login' ? (
          <LoginForm
            formSwitcher={setFormType}
            onComplete={() => setPresentSignIn(false)}
          />
        ) : (
          <RegisterForm formSwitcher={setFormType} />
        )}
      </Modal>
      {user()?.data?.email ? (
        <div class="relative inline-block text-left">
          <div
            class="relative group"
            onClick={() => setPresentUserMenu(!presentUserMenu())}
          >
            <div class="cursor-pointer">
              <svg
                class="fill-current hover:text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <circle fill="none" cx="12" cy="7" r="3" />
                <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z" />
              </svg>
            </div>
            <div class="absolute w-fit bg-white shadow-lg mt-0 right-1 px-2 py-3 z-10 hidden group-hover:block">
              <Stack size="base">
                <a
                  class="inline-block no-underline hover:text-black hover:underline px-4"
                  href="/account"
                >
                  Account
                </a>
                <span
                  class="inline-block no-underline hover:text-black hover:underline px-4"
                  onClick={() => logOut()}
                >
                  Log Out
                </span>
              </Stack>
            </div>
          </div>
        </div>
      ) : (
        <div
          class="inline-block no-underline cursor-pointer hover:text-black"
          onClick={() => {
            setPresentSignIn(!presentSignIn())
          }}
        >
          Sign in
        </div>
      )}
    </div>
  )
}
