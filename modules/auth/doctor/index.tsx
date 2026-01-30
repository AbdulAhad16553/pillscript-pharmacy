"use client";

import Container from "@/components/container";
import DoctorCard from "./doctor-card";
import { dummyDoctorData } from "@/data";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import DoctorFilter from "./doctor-filter";
import DoctorMobileFilter from "./doctor-mobile-filter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const DoctorList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const filteredDoctors = dummyDoctorData.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [selectedFilters, setSelectedFilters] = useState({});

  const removeFilter = (key: any, value: string) => {
    setSelectedFilters((prev: any) => {
      const updatedValues = prev[key]?.filter((v: any) => v !== value);

      return {
        ...prev,
        [key]:
          updatedValues && updatedValues.length > 0 ? updatedValues : undefined,
      };
    });
  };

  return (
    <Container className="w-full lg:max-w-[60%]">
      <div className="flex  flex-row  justify-between items-center mt-5 md:mt-10 gap-3">
        <div className="relative w-full sm:w-80 md:w-full">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-black"
            size={18}
          />

          <Input
            placeholder={isFocused ? "" : "Search by Doctor Name..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="pl-10 w-full"
          />
        </div>
        <div className="block md:hidden">
          <DoctorMobileFilter
            data={filteredDoctors}
            setSelectedFilters={setSelectedFilters}
            selectedFilters={selectedFilters}
          />
        </div>
        <div className="hidden md:block">
          <DoctorFilter
            data={filteredDoctors}
            selectedFilters={selectedFilters}
            setSelectedFilter={setSelectedFilters}
          />
        </div>
      </div>

      {/* //get selected filters */}
      <ScrollArea className="w-full">
        <div className="flex gap-2 mt-4 mb-4 ">
          {Object.entries(selectedFilters).map(([key, values]: any) =>
            values?.map((val: any) => (
              <span
                key={`${key}-${val}`}
                className="flex-shrink-0 flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-none text-sm"
              >
                {val}
                <X
                  size={14}
                  className="cursor-pointer"
                  onClick={() => removeFilter(key as any, val)}
                />
              </span>
            ))
          )}
        </div>
        <ScrollBar orientation="horizontal" className="" />
      </ScrollArea>

      <div className="grid grid-cols-1 gap-4 md:gap-6 mt-6">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((item) => (
            <DoctorCard key={item.id} data={item} />
          ))
        ) : (
          <p className="text-gray-500 text-center">No Doctors found.</p>
        )}
      </div>
    </Container>
  );
};

export default DoctorList;
