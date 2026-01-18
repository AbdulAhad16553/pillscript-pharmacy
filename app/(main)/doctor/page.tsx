import DoctorList from "@/modules/auth/doctor";
import React, { Suspense } from "react";

const DoctorRoute = () => {
  return (
    <Suspense>
      <DoctorList />
    </Suspense>
  );
};

export default DoctorRoute;
