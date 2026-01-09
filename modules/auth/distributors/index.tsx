"use client";
import Container from "@/components/container";
import React, { useMemo, useState } from "react";
import DistributorCard from "./distributor-card";
import { Input } from "@/components/ui/input";
import { distributors } from "@/data";
import DistributorFilter from "./distributor-filter";
import { X } from "lucide-react";

const DistributorsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const [filters, setFilters] = useState<{
    company?: string;
    district?: string;
    baseTown?: string;
  }>({});

  const filteredDistributors = useMemo(() => {
    return distributors.filter((d: any) => {
      const companyMatch =
        !filters.company || d.company === filters.company;
      const districtMatch =
        !filters.district || d.district === filters.district;
      const baseTownMatch =
        !filters.baseTown || d.baseTown === filters.baseTown;
      const searchMatch =
        d.name.toLowerCase().includes(searchTerm.toLowerCase());

      return companyMatch && districtMatch && baseTownMatch && searchMatch;
    });
  }, [filters, searchTerm]);


  const removeFilter = (key: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [key]: undefined }));
  };

  return (
    <Container className="w-full md:max-w-[592px]">
      <div className="space-y-4 py-6">

        {/* Search */}
        <Input
          placeholder="Search by distributor name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
          {/* tags get */}
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
        <DistributorFilter
          onApply={(values) => setFilters(values)}
        />

     

        {/* List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredDistributors.length > 0 ? (
            filteredDistributors.map((dist: any) => (
              <DistributorCard key={dist.id} dist={dist} />
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No distributors found.
            </p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default DistributorsList;
