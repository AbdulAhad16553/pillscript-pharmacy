"use client";
import Container from "@/components/container";
import React, { useMemo, useState } from "react";
import DistributorCard from "./distributor-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { distributors } from "@/data";

const districts = ["All", "Lahore", "Karachi", "Islamabad"];
const types = [
  "All",
  "Pharmaceutical Distributor",
  "Medical Supplies",
  "Pharma Wholesale",
];

const sortOptions = ["Default", "Name A-Z", "Name Z-A", "District"];

const DistributorsList = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Default");

  const filteredDistributors = useMemo(() => {
    let result = distributors.filter((d: any) => {
      const districtMatch =
        selectedDistrict === "All" || d.district === selectedDistrict;
      const typeMatch = selectedType === "All" || d.type === selectedType;
      const searchMatch =
        d.name.toLowerCase().includes(searchTerm.toLowerCase());

      return districtMatch && typeMatch && searchMatch;
    });

    // Sorting
    if (sortBy === "Name A-Z") {
      result = result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "Name Z-A") {
      result = result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "District") {
      result = result.sort((a, b) => a.district.localeCompare(b.district));
    }

    return result;
  }, [selectedDistrict, selectedType, searchTerm, sortBy, distributors]);

  return (
    <Container className="w-full md:max-w-[592px]">
      <div className="grid grid-cols-1  gap-6 py-10">
        {/* filter left side */}
        {/* <aside className="rounded-xl border bg-white p-4 h-fit sticky top-20 space-y-4">
          <h3 className="font-semibold mb-2">Filters</h3>
          <div className="space-y-2">
            <p className="text-sm font-medium">District</p>
            <Select
              value={selectedDistrict}
              onValueChange={(value) => setSelectedDistrict(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select district" />
              </SelectTrigger>

              <SelectContent>
                {districts.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

       
          <div className="space-y-2">
            <p className="text-sm font-medium">Distributor Type</p>
            <Select
              value={selectedType}
              onValueChange={(value) => setSelectedType(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>

              <SelectContent>
                {types.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Sort By</p>
            <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>

              <SelectContent>
                {sortOptions.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </aside> */}

      
        <div className="space-y-4">
 
          <Input
            placeholder="Search by distributor name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />

      
          <div className="grid grid-cols-1 gap-6">
            {filteredDistributors.length > 0 ? (
              filteredDistributors.map((dist: any) => (
                <DistributorCard key={dist.id} dist={dist} />
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No distributors found.
              </p>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DistributorsList;
