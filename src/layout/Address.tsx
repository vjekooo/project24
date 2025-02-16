import { Stack } from '../ui/Stack'
import { Address as AddressType } from '../types'

interface Props {
  address: AddressType
}

export const Address = (props: Props) => {
  return (
    <Stack gap={2}>
      <Stack gap={2} horizontal>
        <span class="">{props.address.street}</span>
        <span class="">{props.address.houseNumber}</span>
      </Stack>
      <Stack gap={2} horizontal>
        <span class="">{props.address.postalCode},</span>
        <span class="">{props.address.city}</span>
      </Stack>
    </Stack>
  )
}
