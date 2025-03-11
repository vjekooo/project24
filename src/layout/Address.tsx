import { Stack } from '../ui/Stack'
import { Address as AddressType } from '../types'

interface Props {
  address: AddressType
}

export const Address = (props: Props) => {
  return (
    <Stack size="sm">
      <Stack size="sm" horizontal>
        <span class="">{props.address.street}</span>
        <span class="">{props.address.houseNumber}</span>
      </Stack>
      <Stack size="sm" horizontal>
        <span class="">{props.address.postalCode},</span>
        <span class="">{props.address.city}</span>
      </Stack>
    </Stack>
  )
}
