import { A } from '@solidjs/router'

export const UserMenu = (props: any) => {
  return (
    <div class="flex flex-col gap-2">
      <A href="/user">User</A>
      <A href="/store">Store</A>
    </div>
  )
}
