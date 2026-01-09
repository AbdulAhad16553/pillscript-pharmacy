import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { COMPANY_OPTIONS, DISTRICT_TOWNS } from '@/data'
import React, { useEffect, useMemo } from 'react'


const FilterForm = ({
  company,
  setCompany,
  district,
  setDistrict,
  baseTown,
  setBaseTown,
}: any) => {

  // 🔥 Base towns depend on selected district
  const baseTownOptions = useMemo(() => {
    if (!district) return []
    return DISTRICT_TOWNS[district] || []
  }, [district])

  // ❌ Reset base town when district changes
  useEffect(() => {
    setBaseTown(undefined)
  }, [district])

  return (
    <>
  
      <div className="space-y-2">
        <p className="text-sm font-medium">Company</p>
        <Select value={company} onValueChange={setCompany}>
          <SelectTrigger>
            <SelectValue placeholder="Select company" />
          </SelectTrigger>
          <SelectContent>
            {COMPANY_OPTIONS.map((c:any) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

    
      <div className="space-y-2">
        <p className="text-sm font-medium">District</p>
        <Select value={district} onValueChange={setDistrict}>
          <SelectTrigger>
            <SelectValue placeholder="Select district" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(DISTRICT_TOWNS).map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Base Town */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Base Town</p>
        <Select
          value={baseTown}
          onValueChange={setBaseTown}
          disabled={!district}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={
                district ? "Select base town" : "Select district first"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {baseTownOptions.map((b:any) => (
              <SelectItem key={b} value={b}>
                {b}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  )
}

export default FilterForm
