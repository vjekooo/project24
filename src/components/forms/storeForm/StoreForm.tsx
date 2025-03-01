import { storeConfig } from './config'
import {
  Category,
  MessageResponse,
  Option,
  Store,
  StoreRequest,
} from '../../../types'
import { Stack } from '../../../ui/Stack'
import { Accessor, createEffect, createSignal, For } from 'solid-js'
import { RequestMethod, useMultipart } from '../../../hooks/useMultipart'
import { Toast } from '../../../lib/Toast'
import MultiSelect from './MultiSelect'

const url = 'store'

interface Props {
  store: Store
  categories: Category[]
  onComplete: (message: string) => void
}

const createCategoryOptions = (categories: Category[]): Option[] => {
  if (!categories) return []
  return categories.map((category) => ({
    value: category.id,
    label: category.name,
  }))
}

export const StoreForm = (props: Props) => {
  const store = props.store
  const onComplete = props.onComplete

  const [formState, setFormState] = createSignal<StoreRequest>({
    name: '',
    description: '',
    existingImages: [],
    category: [],
  })

  const [newImages, setNewImages] = createSignal<File[]>([])

  const [previewUrl, setPreviewUrl] = createSignal<string | null>(null)

  createEffect(() => {
    setFormState({
      name: store?.name || '',
      description: store?.description || '',
      existingImages: store?.media?.map((media) => media.imageUrl) || [],
      category: store?.categories
        ? [...store?.categories?.map((category) => category.id)]
        : [],
    })
  })

  const handleFileChange = (event: Event) => {
    const target = event.currentTarget as HTMLInputElement
    const file = target.files?.[0]
    if (file) {
      setNewImages([...newImages(), file])
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const removeExistingImage = (image: string) => {
    setFormState({
      ...formState(),
      existingImages: formState().existingImages.filter((existingImage) => {
        return existingImage !== image
      }),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newProduct = {
      ...formState(),
    }

    const formData = new FormData()

    for (const key in newImages()) {
      if (newImages()[key]) {
        formData.append('newImages', newImages()[key])
      }
    }

    for (const key in newProduct) {
      formData.append(key, newProduct[key])
    }

    if (store && store?.id) {
      formData.append('id', store?.id)

      const { data, error } = await useMultipart(
        url,
        formData,
        RequestMethod.PUT
      )

      if (data) {
        onComplete(data.message)
      }
      if (error) {
        showToast(error.message)
      }
    } else {
      const { data, error } = await useMultipart(url, formData)
      if (data) {
        onComplete(data.message)
      }
      if (error) {
        showToast(error.message)
      }
    }
  }

  const { ToastComponent, showToast } = Toast()

  return (
    <div class="flex justify-center">
      <ToastComponent />
      <div class="flex flex-col gap-2 w-full">
        <form onSubmit={(e) => handleSubmit(e)}>
          <Stack size="md">
            <Stack size="md">
              <For each={storeConfig}>
                {(item) => {
                  if (item.type === 'text') {
                    return (
                      <Stack size="sm">
                        <p>{item.label}</p>
                        <input
                          class="input"
                          name={item.name}
                          type={item.type}
                          placeholder={item.label}
                          onChange={(event) =>
                            setFormState({
                              ...formState(),
                              [item.name]: event.target.value,
                            })
                          }
                          value={formState()?.[item.name] || ''}
                        />
                      </Stack>
                    )
                  }
                  return (
                    <Stack size="sm">
                      <p>{item.label}</p>
                      <textarea
                        class="text-area"
                        name={item.name}
                        placeholder={item.label}
                        onChange={(event) =>
                          setFormState({
                            ...formState(),
                            [item.name]: event.target.value,
                          })
                        }
                        value={formState()?.[item.name] || ''}
                      />
                    </Stack>
                  )
                }}
              </For>
            </Stack>
            <Stack size="sm">
              <p>Categories</p>
              <MultiSelect
                options={createCategoryOptions(props.categories)}
                value={formState().category}
                onChange={(value) => {
                  setFormState({
                    ...formState(),
                    category: [...value],
                  })
                }}
              />
            </Stack>
            {formState()?.existingImages?.map((image) => (
              <div class="w-[120px] relative">
                <div
                  class="absolute top-[-5px] right-[-5px] bg-gray-50 rounded-full w-[25px] h-[25px] flex justify-center items-center cursor-pointer"
                  onClick={() => removeExistingImage(image)}
                >
                  X
                </div>
                <img
                  class="w-full aspect-square object-cover hover:grow hover:shadow-lg"
                  src={image}
                  alt="product image"
                />
              </div>
            ))}
            {previewUrl() && (
              <div class="mt-4">
                <p>Preview:</p>
                <img
                  src={previewUrl()}
                  alt="Uploaded Preview"
                  class="w-[100px]"
                />
              </div>
            )}
            <Stack size="sm">
              <p>Select images</p>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
            </Stack>
            <button class="btn-primary" type="submit">
              Submit
            </button>
          </Stack>
        </form>
      </div>
    </div>
  )
}
