import { Stack } from '../ui/Stack'
import { Address as AddressType } from '../types'

interface Props {
  address: AddressType
}

export const Address = ({ address }: Props) => {
  return (
    <div>
      {address && (
        <Stack gap={2}>
          <Stack gap={2} horizontal>
            <span class="">{address.street}</span>
            <span class="">{address.houseNumber}</span>
          </Stack>
          <Stack gap={2} horizontal>
            <span class="">{address.postalCode},</span>
            <span class="">{address.city}</span>
          </Stack>
        </Stack>
      )}
    </div>
  )
}
