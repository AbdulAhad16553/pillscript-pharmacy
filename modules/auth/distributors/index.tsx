"use client";
import Container from "@/components/container";
import React, { useMemo, useState } from "react";
import DistributorCard from "./distributor-card";
import { Input } from "@/components/ui/input";
import { distributors } from "@/data";
import DistributorFilter from "./distributor-filter";
import { Search, X } from "lucide-react";


const DistributorsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const [filters, setFilters] = useState<{
    company?: string;
    district?: string;
    baseTown?: string;
  }>({});

  const filteredDistributors = useMemo(() => {
    return distributors.filter((d: any) => {
      const companyMatch = !filters.company || d.company === filters.company;
      const districtMatch =
        !filters.district || d.district === filters.district;
      const baseTownMatch =
        !filters.baseTown || d.baseTown === filters.baseTown;
      const searchMatch = d.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return companyMatch && districtMatch && baseTownMatch && searchMatch;
    });
  }, [filters, searchTerm]);

  const removeFilter = (key: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [key]: undefined }));
  };

  return (
    <Container className="w-full md:max-w-148">
      <div className="space-y-4 py-6">
        <div className="flex flex-row gap-3 justify-between items-center">
          <div className="relative w-full sm:w-80 md:w-full">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-black"
            size={18}
          />

          <Input
  placeholder={isFocused ? "" : "Search by distributor name..."}
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  onFocus={() => setIsFocused(true)}
  onBlur={() => setIsFocused(false)}
  className="pl-10 w-full"
/>

        </div>
           <DistributorFilter onApply={(values) => setFilters(values)} />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters).map(
            ([key, value]) =>
              value && (
                <span
                  key={key}
                  className="flex flex-wrap md:flex-wrap items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  {value}
                  <X
                    size={14}
                    className="cursor-pointer"
                    onClick={() => removeFilter(key as any)}
                  />
                </span>
              )
          )}
        </div>
       

        {/* List */}
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {filteredDistributors.length > 0 ? (
            filteredDistributors.map((dist: any) => (
              <DistributorCard key={dist.id} dist={dist} />
            ))
          ) : (
            <p className="text-gray-500 text-center">No distributors found.</p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default DistributorsList;
