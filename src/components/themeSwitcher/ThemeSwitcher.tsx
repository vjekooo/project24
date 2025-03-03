import { createEffect, createSignal } from 'solid-js'

enum Theme {
  dark = 'dark',
  light = 'light',
}

export const ThemeSwitcher = () => {
  const [theme, setTheme] = createSignal(Theme.light)

  const toggleTheme = (theme: Theme) => {
    localStorage.setItem('theme', theme)
    setTheme(theme)
  }

  createEffect(() => {
    const theme = localStorage.getItem('theme') as Theme
    if (theme) {
      setTheme(theme)
      if (theme === Theme.dark) {
        document.documentElement.classList.add(theme)
      }
    }
  })

  return (
    <div class="flex flex-col justify-center ml-3">
      <input type="checkbox" name="light-switch" class="light-switch sr-only" />
      <label class="relative cursor-pointer p-2" for="light-switch">
        <svg
          class={theme() === Theme.light ? 'block dark:hidden' : 'hidden'}
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => toggleTheme(Theme.dark)}
        >
          <path
            class="fill-slate-300"
            d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z"
          />
          <path
            class="fill-slate-400"
            d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"
          />
        </svg>
        <svg
          class={theme() === Theme.dark ? 'block light:hidden' : 'hidden'}
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => toggleTheme(Theme.light)}
        >
          <path
            class="fill-slate-400"
            d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z"
          />
          <path
            class="fill-slate-500"
            d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z"
          />
        </svg>
      </label>
    </div>
  )
}
