import type { Component } from 'solid-js'
import Header from './layout/header/Header'

const App: Component = () => {
  return (
    <>
      <Header />
      <p class="text-4xl text-green-700 text-center py-20">Hello tailwind!</p>
    </>
  )
}

export default App
