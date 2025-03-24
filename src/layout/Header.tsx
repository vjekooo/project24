import { createSignal } from 'solid-js'
import { clientOnly } from '@solidjs/start'

import { Logo } from '~/icons/Logo'
import { ThemeSwitcher } from '~/components/themeSwitcher/ThemeSwitcher'

const ClientOnlyComp = clientOnly(() => import('./UserComponent'))

export const Header = () => {
  const [presentMenu, setPresentMenu] = createSignal(false)

  return (
    <div class="w-full">
      <nav id="header" class="w-full z-30 top-0 py-1 px-6 md:px-0">
        <div class="w-full container mx-auto flex flex-wrap items-center mt-0 py-3">
          <div class="w-1/3 flex justify-start content-center">
            <div class="relative md:hidden block">
              <div
                class="cursor-pointer md:hidden block"
                onClick={() => setPresentMenu(!presentMenu())}
              >
                <svg
                  class="fill-current text-gray-900"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <title>menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                </svg>
              </div>

              {presentMenu() && (
                <div class="absolute w-600 bg-white shadow-lg mt-1">
                  <ul class="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
                    <li>
                      <a
                        class="inline-block no-underline hover:text-black hover:underline py-2 px-4"
                        href="#"
                      >
                        Shop
                      </a>
                    </li>
                    <li>
                      <a
                        class="inline-block no-underline hover:text-black hover:underline py-2 px-4"
                        href="#"
                      >
                        About
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div class="hidden md:flex md:items-center md:w-auto w-full">
              <nav>
                <ul class="md:flex items-center justify-between gap-6 text-base text-gray-700 pt-4 md:pt-0">
                  <li>
                    <a
                      class="inline-block no-underline hover:text-black hover:underline py-2"
                      href="/category"
                    >
                      Categories
                    </a>
                  </li>
                  <li>
                    <a
                      class="inline-block no-underline hover:text-black hover:underline py-2"
                      href="/stores"
                    >
                      Stores
                    </a>
                  </li>
                  <li>
                    <a
                      class="inline-block no-underline hover:text-black hover:underline py-2"
                      href="/services"
                    >
                      Services
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div class="w-1/3 flex justify-center">
            <a
              class="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
              href="/"
            >
              <Logo />
            </a>
          </div>

          <div class="w-1/3 flex justify-end items-center gap-6">
            <ThemeSwitcher />
            <ClientOnlyComp />
            {/*<a class="pl-3 inline-block no-underline hover:text-black" href="#">*/}
            {/*  <svg*/}
            {/*    class="fill-current hover:text-black"*/}
            {/*    xmlns="http://www.w3.org/2000/svg"*/}
            {/*    width="24"*/}
            {/*    height="24"*/}
            {/*    viewBox="0 0 24 24"*/}
            {/*  >*/}
            {/*    <path d="M21,7H7.462L5.91,3.586C5.748,3.229,5.392,3,5,3H2v2h2.356L9.09,15.414C9.252,15.771,9.608,16,10,16h8 c0.4,0,0.762-0.238,0.919-0.606l3-7c0.133-0.309,0.101-0.663-0.084-0.944C21.649,7.169,21.336,7,21,7z M17.341,14h-6.697L8.371,9 h11.112L17.341,14z" />*/}
            {/*    <circle cx="10.5" cy="18.5" r="1.5" />*/}
            {/*    <circle cx="17.5" cy="18.5" r="1.5" />*/}
            {/*  </svg>*/}
            {/*</a>*/}
          </div>
        </div>
      </nav>
    </div>
  )
}
