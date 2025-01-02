import { A } from '@solidjs/router'
import { User } from '../../../types'

interface Props {
  user: User
}

export const UserMenu = ({ user }: Props) => {
  return (
    <div class="flex flex-col gap-2">
      <A href="/account">Account</A>
      {user.stores && <A href="/store">Store</A>}
    </div>
  )
}
