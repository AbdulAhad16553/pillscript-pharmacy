import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import DoctorTabs from "./doctor-tabs";

const DoctorFilter = ({ data, selectedFilters, setSelectedFilter }: any) => {
  const [open, setOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState(selectedFilters);

  useEffect(() => {
    if (open) setTempFilters(selectedFilters);
  }, [open, selectedFilters]);

  const applySubmit = () => {
    setSelectedFilter(tempFilters);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 text-sm">
          <FilterIcon size={16} />
          Filter
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg p-0 m-0">
        <DialogHeader className="p-0 px-8 py-5 mb-0 border-b text-center">
          <DialogTitle className="text-center text-lg mb-0">Filter</DialogTitle>
        </DialogHeader>

        <DoctorTabs filters={tempFilters} setFilters={setTempFilters} />

        <div className="flex gap-3 px-6 py-4 border-t">
          <div className="flex flex-col justify-center flex-1">
            <h2 className="font-bold text-md">{data?.length}+</h2>
            <p className="text-gray-300 text-sm">Doctors Available</p>
          </div>

          <Button className="flex-1" onClick={applySubmit}>
            Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DoctorFilter;
