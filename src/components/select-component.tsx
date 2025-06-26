"use client"

import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface CustomSelectProps {
  options: SelectOption[]
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
  placeholder?: string
  multiple?: boolean
  filterable?: boolean
  disabled?: boolean
  className?: string
  maxSelectedDisplay?: number
}

export function CustomSelect({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select option...",
  multiple = false,
  filterable = false,
  disabled = false,
  className,
  maxSelectedDisplay = 3,
}: CustomSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState<string | string[]>(defaultValue || (multiple ? [] : ""))

  const currentValue = value !== undefined ? value : internalValue

  const handleSelect = (selectedValue: string) => {
    let newValue: string | string[]

    if (multiple) {
      const currentArray = Array.isArray(currentValue) ? currentValue : []
      if (currentArray.includes(selectedValue)) {
        newValue = currentArray.filter((v) => v !== selectedValue)
      } else {
        newValue = [...currentArray, selectedValue]
      }
    } else {
      newValue = selectedValue
      setOpen(false)
    }

    if (value === undefined) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }

  const handleRemove = (valueToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (multiple && Array.isArray(currentValue)) {
      const newValue = currentValue.filter((v) => v !== valueToRemove)
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }
  }

  const getSelectedOptions = () => {
    if (multiple && Array.isArray(currentValue)) {
      return options.filter((option) => currentValue.includes(option.value))
    }
    if (!multiple && typeof currentValue === "string") {
      return options.filter((option) => option.value === currentValue)
    }
    return []
  }

  const selectedOptions = getSelectedOptions()

  const getDisplayText = () => {
    if (selectedOptions.length === 0) {
      return placeholder
    }

    if (!multiple) {
      return selectedOptions[0]?.label
    }

    if (selectedOptions.length <= maxSelectedDisplay) {
      return null // Will show badges instead
    }

    return `${selectedOptions.length} selected`
  }

  const displayText = getDisplayText()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between min-h-10 h-auto",
            !selectedOptions.length && "text-muted-foreground",
            className,
          )}
          disabled={disabled}
        >
          <div className="flex flex-wrap gap-1 flex-1">
            {multiple && selectedOptions.length > 0 && !displayText ? (
              selectedOptions.slice(0, maxSelectedDisplay).map((option) => (
                <Badge key={option.value} variant="secondary" className="text-xs">
                  {option.label}
                  <button
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleRemove(option.value, e as any)
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onClick={(e) => handleRemove(option.value, e)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              ))
            ) : (
              <span className="truncate">{displayText}</span>
            )}
            {multiple && selectedOptions.length > maxSelectedDisplay && (
              <Badge variant="secondary" className="text-xs">
                +{selectedOptions.length - maxSelectedDisplay} more
              </Badge>
            )}
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          {filterable && <CommandInput placeholder="Search options..." className="h-9" />}
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = multiple
                  ? Array.isArray(currentValue) && currentValue.includes(option.value)
                  : currentValue === option.value

                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <Check className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")} />
                    {option.label}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
