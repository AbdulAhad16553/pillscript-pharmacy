"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import DoctorTabs from "../doctor-filter/doctor-tabs";

const DoctorMobileFilter = ({ data }: any) => {
  return (
    <Sheet>
      {/* Open Button */}
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2 w-full">
          <FilterIcon size={16} />
        </Button>
      </SheetTrigger>

      <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0">
        <SheetHeader className="px-4 py-3 border-b">
          <SheetTitle>Filter</SheetTitle>
        </SheetHeader>
        <DoctorTabs />

        <div className="flex gap-3 px-6 py-4 border-t">
          <div className="flex flex-col justify-center flex-1">
            <h2 className="font-bold text-md">{data?.length}+</h2>
            <p className="text-gray-300 text-sm">Doctors Available</p>
          </div>

          <Button className="flex-1">Apply</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DoctorMobileFilter;
