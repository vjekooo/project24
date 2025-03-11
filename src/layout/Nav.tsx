import { createSignal } from 'solid-js'
import { DebouncedSearchForm } from '../components/searchForm/SearchForm'

interface Props {
  title: string
}

export const Nav = ({ title }: Props) => {
  const [presentSearch, setPresentSearch] = createSignal(false)

  return (
    <nav id="store" class="w-full z-30 top-0 py-1 mb-8">
      <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-3">
        <span class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 h3">
          {title}
        </span>

        <div class="flex items-center" id="store-nav-content">
          <a class="pl-3 inline-block no-underline hover:text-black" href="#">
            <svg
              class="fill-current hover:text-black"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" />
            </svg>
          </a>

          <div onClick={() => setPresentSearch(true)} class="relative">
            <svg
              class="fill-current hover:text-black"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
            </svg>
            {presentSearch() && (
              <div
                class="absolute bg-white rounded shadow-lg mt-2 right-12"
                style="width: 300px"
              >
                <DebouncedSearchForm />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
