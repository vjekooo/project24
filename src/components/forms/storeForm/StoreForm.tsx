import { $fetch } from '../../../utils/fetch'
import { storeConfig } from './config'
import { useForm } from '../../../lib/form/useForm'
import { Category, MessageResponse, Option, Store } from '../../../types'
import { Stack } from '../../../ui/Stack'

const url = 'store'

interface Props {
  categories: Category[]
  onComplete: () => void
}

const createCategoryOptions = (categories: Category[]): Option[] => {
  if (!categories) return []
  categories.unshift({ id: '0L', name: 'Select category', description: '' })
  return categories.map((category) => ({
    value: category.id,
    label: category.name,
  }))
}

export const StoreForm = ({ categories, onComplete }: Props) => {
  const { validate, formSubmit, errors, updateFormField } = useForm<Store>({
    config: storeConfig,
  })

  const handleSubmit = async (_: Event, form: Store) => {
    const { data, error } = await $fetch<Store, MessageResponse>(url).post(form)
    if (data) onComplete()
  }

  return (
    <div class="flex justify-center">
      <div class="flex flex-col gap-2">
        {/*@ts-ignore*/}
        <form use:formSubmit={handleSubmit}>
          <Stack size="md">
            {storeConfig.map((field) => {
              return field.type === 'text' ? (
                <input
                  // @ts-ignore
                  use:validate={field.validation}
                  class="input"
                  type={field.type}
                  placeholder={field.label}
                  onChange={updateFormField(field.name, field.isArray)}
                />
              ) : (
                <select
                  name={field.name}
                  class="input"
                  onChange={updateFormField(field.name)}
                  // @ts-ignore
                  use:validate={field.validation}
                >
                  {createCategoryOptions(categories).map((option) => (
                    <option value={option.value}>{option.label}</option>
                  ))}
                </select>
              )
            })}
            <button class="btn-primary" type="submit">
              Submit
            </button>
          </Stack>
        </form>
      </div>
    </div>
  )
}
