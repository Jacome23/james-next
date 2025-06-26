"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DollarSign } from "lucide-react"

interface NumberInputProps {
  logo?: boolean,
  label?: string
  placeholder?: string
  value?: number
  onChange?: (value: number) => void
  disabled?: boolean
  className?: string
}

export default function NumberInput({
  logo = true,
  label,
  placeholder = "0.00",
  value,
  onChange,
  disabled = false,
  className,
}: NumberInputProps) {
  const [displayValue, setDisplayValue] = useState("")

  // Update display value when external value changes
  useEffect(() => {
    if (value !== undefined) {
      setDisplayValue(value.toFixed(2))
    }
  }, [value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    // Allow empty input
    if (inputValue === "") {
      setDisplayValue("")
      onChange?.(0)
      return
    }

    // Only allow numbers and one decimal point
    const numericRegex = /^\d*\.?\d*$/
    if (!numericRegex.test(inputValue)) {
      return
    }

    // Prevent multiple decimal points
    const decimalCount = (inputValue.match(/\./g) || []).length
    if (decimalCount > 1) {
      return
    }

    // Limit to 2 decimal places
    const parts = inputValue.split(".")
    if (parts[1] && parts[1].length > 2) {
      return
    }

    setDisplayValue(inputValue)

    // Convert to number and call onChange
    const numericValue = Number.parseFloat(inputValue) || 0
    onChange?.(numericValue)
  }

  const handleBlur = () => {
    if (displayValue === "") {
      setDisplayValue("0.00")
      onChange?.(0)
      return
    }

    // Format to 2 decimal places on blur
    const numericValue = Number.parseFloat(displayValue) || 0
    const formattedValue = numericValue.toFixed(2)
    setDisplayValue(formattedValue)
    onChange?.(numericValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter, decimal point
    if (
      [8, 9, 27, 13, 46, 110, 190].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (e.keyCode === 65 && e.ctrlKey === true) ||
      (e.keyCode === 67 && e.ctrlKey === true) ||
      (e.keyCode === 86 && e.ctrlKey === true) ||
      (e.keyCode === 88 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      return
    }

    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault()
    }
  }

  return (
    <div className="space-y-2">
      {label && <Label htmlFor="number-input">{label}</Label>}
      <div className="relative">
        {logo && (<DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />)}
        <Input
          id="number-input"
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={`${logo ? 'pl-10': ''} ${className || ""}`}
          inputMode="decimal"
        />
      </div>
    </div>
  )
}