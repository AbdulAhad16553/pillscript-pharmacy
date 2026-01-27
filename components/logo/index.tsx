import Image from "next/image";
import React from "react";

const MainLogo = () => {
  return (
    <div className=" ">
      <Image
        src="/assets/svg/logo2.svg"
        alt="PillScript Logo"
        className="object-contain  h-[300px] md:h-[120px] "
        width={100}
        height={100}
      />
    </div>
  );
};

export default MainLogo;
