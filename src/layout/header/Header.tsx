import { useContext, type Component } from 'solid-js'
import Login from './Login'
import { A } from '@solidjs/router'
import { AppContext } from '../../index'

const Header: Component = () => {
  const { state } = useContext(AppContext)
  return (
    <div class="flex items-center justify-between">
      <A href="/">
        <div>Logo goes here</div>
      </A>
      <p class="text-4xl text-green-700 text-center py-20">This is a header</p>
      {!state.user.token ? <Login /> : 'icon'}
    </div>
  )
}

export default Header
