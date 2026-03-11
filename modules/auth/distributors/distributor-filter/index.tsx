import { Button } from '@/components/ui/button'
import { FilterIcon, X } from 'lucide-react'
import React, { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import FilterForm from './filter'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"

const DistributorFilter = ({ onApply }: { onApply: (v: any) => void }) => {
  const [open, setOpen] = useState(false)

  const [company, setCompany] = useState<string>()
  const [district, setDistrict] = useState<string>()
  const [baseTown, setBaseTown] = useState<string>()

  const applyFilters = () => {
    onApply({ company, district, baseTown })
    setOpen(false)
  }

  const clearFilters = () => {
    setCompany(undefined)
    setDistrict(undefined)
    setBaseTown(undefined)
    onApply({})
    setOpen(false)
  }

  const removeFilter = (key: "company" | "district" | "baseTown") => {
    if (key === "company") setCompany(undefined)
    if (key === "district") setDistrict(undefined)
    if (key === "baseTown") setBaseTown(undefined)
  }

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>

        {/* Trigger */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2 text-sm">
                  <FilterIcon size={16} />
                </Button>
              </SheetTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Filters</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

      
        <SheetContent side="bottom" className="flex flex-col rounded-t-2xl">
            <SheetHeader className="pb-3 border-b">
              <Button variant="outline" className="w-fit gap-2 text-sm">
                  <FilterIcon size={16} />
                  Filters
                </Button>
          {(company || district || baseTown) && (
          
              <div className="flex flex-wrap gap-2">
                {company && (
                  <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {company}
                    <X size={14} className="cursor-pointer" onClick={() => removeFilter("company")} />
                  </span>
                )}
                {district && (
                  <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {district}
                    <X size={14} className="cursor-pointer" onClick={() => removeFilter("district")} />
                  </span>
                )}
                {baseTown && (
                  <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {baseTown}
                    <X size={14} className="cursor-pointer" onClick={() => removeFilter("baseTown")} />
                  </span>
                )}
              </div>
           
          )}
           </SheetHeader>

        
          <div className=" pt-4">
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
            <Button variant="outline" className="w-full" onClick={clearFilters}>
              Clear Filters
            </Button>
            <Button className="w-full" onClick={applyFilters}>
              Apply
            </Button>
          </SheetFooter>

        </SheetContent>
      </Sheet>
    </div>
  )
}

export default DistributorFilter
