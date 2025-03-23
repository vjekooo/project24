import { Stack } from '~/ui/Stack'
import { Address as AddressType } from '../types'

interface Props {
  address: AddressType
}

export const Address = (props: Props) => {
  const address = props.address

  return (
    <Stack size="sm">
      <Stack size="sm" horizontal>
        <span class="">{address.street}</span>
        <span class="">{address.houseNumber}</span>
      </Stack>
      <Stack size="sm" horizontal>
        <span class="">{address.postalCode},</span>
        <span class="">{address.city}</span>
      </Stack>
    </Stack>
  )
}
