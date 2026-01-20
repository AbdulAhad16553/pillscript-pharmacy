"use client";

import Container from "@/components/container";
import DoctorCard from "./doctor-card";
import { dummyDoctorData } from "@/data";

const DoctorList = () => {
  return (
    <Container className="w-full md:max-w-[60%]">
      <div className="grid grid-cols-1 gap-4 md:gap-6 mt-10">
        {dummyDoctorData.length > 0 ? (
          dummyDoctorData.map((item) => (
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
