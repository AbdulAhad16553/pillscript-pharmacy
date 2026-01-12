"use client"

import React, { useEffect, useMemo, useState } from "react"



import { COMPANY_OPTIONS, DISTRICT_TOWNS } from "@/data"
import SearchableSelect from "@/components/searchableSelect"

type FilterFormProps = {
  company?: string
  setCompany: (v?: string) => void
  district?: string
  setDistrict: (v?: string) => void
  baseTown?: string
  setBaseTown: (v?: string) => void
}




const FilterForm = ({
  company,
  setCompany,
  district,
  setDistrict,
  baseTown,
  setBaseTown,
}: FilterFormProps) => {

  
  const baseTownOptions = useMemo(() => {
    if (!district) return []
    return DISTRICT_TOWNS[district] || []
  }, [district])

 
  useEffect(() => {
    setBaseTown(undefined)
  }, [district])

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <p className="text-sm font-medium">Company</p>
        <SearchableSelect
          value={company}
          onChange={setCompany}
          options={COMPANY_OPTIONS}
          placeholder="Select company"
          searchPlaceholder="Search company..."
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">District</p>
        <SearchableSelect
          value={district}
          onChange={setDistrict}
          options={Object.keys(DISTRICT_TOWNS)}
          placeholder="Select district"
          searchPlaceholder="Search district..."
        />
      </div>

     
      <div className="space-y-2">
        <p className="text-sm font-medium">Base Town</p>
        <SearchableSelect
          value={baseTown}
          onChange={setBaseTown}
          options={baseTownOptions}
          placeholder={
            district ? "Select base town" : "Select district first"
          }
          searchPlaceholder="Search base town..."
          disabled={!district}
        />
      </div>

    </div>
  )
}

export default FilterForm
