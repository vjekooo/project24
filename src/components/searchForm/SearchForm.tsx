import { createSignal } from 'solid-js'
import { useNavigate } from '@solidjs/router'

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

export const DebouncedSearchForm = () => {
  const [query, setQuery] = createSignal('')
  const navigate = useNavigate()

  const navigateToSearch = debounce((value: string) => {
    if (value.trim()) {
      navigate(`/search/?q=${value.trim()}`)
    }
  }, 300)

  const handleInput = (e: Event) => {
    const value = (e.target as HTMLInputElement).value
    setQuery(value)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      navigateToSearch(query())
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search ..."
        class="border px-4 py-2 rounded-md w-full"
        value={query()}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}
