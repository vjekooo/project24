import type { Component } from 'solid-js'
import Login from './Login'

const Header: Component = () => {
  return (
    <div class="flex items-center justify-between">
      <div>Logo goes here</div>
      <p class="text-4xl text-green-700 text-center py-20">This is a header</p>
      <Login />
    </div>
  )
}

export default Header
