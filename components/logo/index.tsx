import Image from "next/image";
import React from "react";

const MainLogo = () => {
  return (
    <div className=" ">
      <Image
        src="/assets/svg/logo.svg"
        alt="PillScript Logo"
        className="object-contain  "
        width={100}
        height={100}
      />
    </div>
  );
};

export default MainLogo;
