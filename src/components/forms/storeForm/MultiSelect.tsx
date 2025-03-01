import { createSignal, createEffect } from 'solid-js'

interface Option {
  label: string
  value: string
}

interface MultiSelectProps {
  options: Option[]
  value?: string[]
  onChange?: (selected: string[]) => void
}

const MultiSelect = (props: MultiSelectProps) => {
  const [isOpen, setIsOpen] = createSignal(false)
  const [selectedOptions, setSelectedOptions] = createSignal<string[]>(
    props.value || []
  )

  createEffect(() => {
    if (props.value) {
      setSelectedOptions(props.value)
    }
  }, [props.value.length])

  const toggleDropdown = () => setIsOpen(!isOpen())

  const handleSelect = (value: string) => {
    if (selectedOptions().includes(value)) {
      setSelectedOptions(
        selectedOptions().filter((selected) => selected !== value)
      )
    } else {
      setSelectedOptions([...selectedOptions(), value])
    }
    props.onChange && props.onChange(selectedOptions())
  }

  const removeTag = (value: string) => {
    setSelectedOptions(
      selectedOptions().filter((selected) => selected !== value)
    )
  }

  return (
    <div class="relative w-full max-w-sm">
      <button
        type="button"
        class="w-full border border-gray-300 py-2 px-3 text-left focus:outline-none focus:ring-1 focus:ring-blue-500"
        onclick={toggleDropdown}
      >
        {selectedOptions().length > 0
          ? `Selected (${selectedOptions().length})`
          : 'Select items'}
        <span class="float-right">&#9662;</span>
      </button>

      {isOpen() && (
        <ul class="absolute z-10 w-full mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
          {props.options.map((option) => (
            <li>
              <label class="flex items-center px-4 py-2 cursor-pointer hover:bg-blue-100">
                <input
                  type="checkbox"
                  class="form-checkbox mr-2"
                  checked={selectedOptions().includes(option.value)}
                  onchange={() => handleSelect(option.value)}
                />
                {option.label}
              </label>
            </li>
          ))}
        </ul>
      )}

      <div class="mt-3 flex flex-wrap gap-2">
        {selectedOptions().map((value) => {
          const option = props.options.find((o) => o.value === value)
          if (!option) return null

          return (
            <div class="inline-flex items-center gap-2 bg-blue-100 text-blue-800 rounded-md px-2 py-1 text-sm">
              {option.label}
              <button
                type="button"
                onclick={() => removeTag(value)}
                class="text-red-700"
              >
                &#x2715;
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MultiSelect
