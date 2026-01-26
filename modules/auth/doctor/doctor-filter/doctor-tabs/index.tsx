import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FilterCheckboxList from "@/components/filter-checkbox";
import { cityTownData, districtData, genderData, specialityData } from "@/data";

const DoctorTabs = () => {
  return (
    <Tabs
      defaultValue="speciality"
      className="flex gap-1 md:gap-2 p-0 m-0 h-[350px] w-full"
    >
      <TabsList
        className="
     w-fit md:w-44
      h-full
      flex-col
      items-start
      rounded-none
      bg-gray-100
      p-0
      border-r border-gray-300
      mt-0
      space-y-3
    "
      >
        <TabsTrigger
          value="speciality"
          className="
        w-full
        justify-start
        rounded-none
        px-4
        py-3
        text-sm
        text-gray-600
        hover:bg-gray-200
        data-[state=active]:bg-white
        data-[state=active]:text-black
        data-[state=active]:border-l-4
        data-[state=active]:border-blue-600
      "
        >
          Speciality
        </TabsTrigger>

        <TabsTrigger
          value="district"
          className="
        w-full
        justify-start
        rounded-none
        px-4
        py-3
        text-sm
        text-gray-600
        hover:bg-gray-200
        data-[state=active]:bg-white
        data-[state=active]:text-black
        data-[state=active]:border-l-4
        data-[state=active]:border-blue-600
      "
        >
          District
        </TabsTrigger>

        <TabsTrigger
          value="city-town"
          className="
        w-full
        justify-start
        rounded-none
        px-4
        py-3
        text-sm
        text-gray-600
        hover:bg-gray-200
        data-[state=active]:bg-white
        data-[state=active]:text-black
        data-[state=active]:border-l-4
        data-[state=active]:border-blue-600
      "
        >
          City&Town
        </TabsTrigger>

        <TabsTrigger
          value="locality"
          className="
        w-full
        justify-start
        rounded-none
        px-4
        py-3
        text-sm
        text-gray-600
        hover:bg-gray-200
        data-[state=active]:bg-white
        data-[state=active]:text-black
        data-[state=active]:border-l-4
        data-[state=active]:border-blue-600
      "
        >
          Locality
        </TabsTrigger>
        <TabsTrigger
          value="gender"
          className="
        w-full
        justify-start
        rounded-none
        px-4
        py-3
        text-sm
        text-gray-600
        hover:bg-gray-200
        data-[state=active]:bg-white
        data-[state=active]:text-black
        data-[state=active]:border-l-4
        data-[state=active]:border-blue-600
      "
        >
          Gender
        </TabsTrigger>
      </TabsList>

      <div className="flex-1 h-full bg-white p-0 overflow-y-auto">
        <TabsContent value="speciality" className="h-full px-2 py-2">
          <FilterCheckboxList title="Select Speciality" data={specialityData} />
        </TabsContent>

        <TabsContent value="district" className="h-full p-4">
          <FilterCheckboxList title="Select District" data={districtData} />
        </TabsContent>

        <TabsContent value="city-town" className="h-full p-4">
          <FilterCheckboxList title="Select City / Town" data={cityTownData} />
        </TabsContent>

        <TabsContent value="locality" className="h-full p-4">
          <FilterCheckboxList title="Select Locality" data={cityTownData} />
        </TabsContent>

        <TabsContent value="gender" className="h-full p-4">
          <FilterCheckboxList title="Select Gender" data={genderData} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default DoctorTabs;
