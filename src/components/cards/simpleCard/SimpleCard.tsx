import { Component, JSX } from 'solid-js'

export const SimpleCard: Component<{ children: JSX.Element }> = ({
  children,
}) => {
  return <div class="card">{children}</div>
}
