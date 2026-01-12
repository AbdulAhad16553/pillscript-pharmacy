import React, { useState } from 'react'
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { COMPANY_OPTIONS, DISTRICT_TOWNS } from "@/data"

const SearchableSelect = ({
  value,
  onChange,
  options,
  placeholder,
  searchPlaceholder,
  disabled = false,
}: {
  value?: string
  onChange: (v: string) => void
  options: string[]
  placeholder: string
  searchPlaceholder: string
  disabled?: boolean
}) => {
  const [open, setOpen] = useState(false)

  return (
   <Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild disabled={disabled}>
    <Button
      variant="outline"
      role="combobox"
      className="w-full justify-between"
    >
      {value || placeholder}
      <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
    </Button>
  </PopoverTrigger>

  <PopoverContent
    className="w-full p-0 bg-white shadow-lg border rounded-md"
  >
    <Command className="w-full bg-white">
    
      <CommandInput className="w-full" placeholder={searchPlaceholder} />
      <CommandEmpty>No results found.</CommandEmpty>

  
      <CommandGroup className="w-full  max-h-60 overflow-y-auto">
        {options.map((item) => (
          <CommandItem
            key={item}
            value={item}
            onSelect={() => {
              onChange(item)
              setOpen(false)
            }}
            className="w-full"
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                value === item ? "text-blue-600 opacity-100" : "opacity-0"
              )}
            />
            {item}
          </CommandItem>
        ))}
      </CommandGroup>
    </Command>
  </PopoverContent>
</Popover>

  )
}

export default SearchableSelect