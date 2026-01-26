"use client";

import Container from "@/components/container";
import DoctorCard from "./doctor-card";
import { dummyDoctorData } from "@/data";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import DoctorFilter from "./doctor-filter";
import DoctorMobileFilter from "./doctor-mobile-filter";

const DoctorList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const filteredDoctors = dummyDoctorData.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
          <DoctorMobileFilter data={filteredDoctors} />
        </div>
        <div className="hidden md:block">
          {/* desktop filter  */}
          <DoctorFilter data={filteredDoctors} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:gap-6 mt-10">
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
