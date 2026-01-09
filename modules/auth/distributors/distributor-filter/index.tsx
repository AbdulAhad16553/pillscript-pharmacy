

import { Button } from '@/components/ui/button'
import { FilterIcon } from 'lucide-react'
import React, { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet"
import FilterForm from './filter'

const DistributorFilter = ({ onApply }: { onApply: (v: any) => void }) => {
  const [open, setOpen] = useState(false)

  const [company, setCompany] = useState<string>()
  const [district, setDistrict] = useState<string>()
  const [baseTown, setBaseTown] = useState<string>()

  const applyFilters = () => {
    onApply({
      company,
      district,
      baseTown,
    })
    setOpen(false) 
  }

  const clearFilters = () => {
    setCompany(undefined)
    setDistrict(undefined)
    setBaseTown(undefined)
    onApply({})
    setOpen(false) 
  }

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="gap-2 text-sm">
            <FilterIcon size={16} />
            Filters
          </Button>
        </SheetTrigger>

        <SheetContent side="bottom" className="flex flex-col rounded-t-2xl">
          <div className="flex-1 space-y-5 pt-2">
            <FilterForm
              company={company}
              setCompany={setCompany}
              district={district}
              setDistrict={setDistrict}
              baseTown={baseTown}
              setBaseTown={setBaseTown}
            />
          </div>

          <SheetFooter className="flex-row gap-2 border-t pt-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={clearFilters}
            >
              Clear
            </Button>
            <Button
              className="w-full"
              onClick={applyFilters}
            >
              Apply
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default DistributorFilter
