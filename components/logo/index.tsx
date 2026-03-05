import Image from "next/image";
import React from "react";

const MainLogo = () => {
  return (
    <div className="md:mx-3 ">
      <Image
        src="/assets/svg/logo2.svg"
        alt="PillScript Logo"
        className="object-contain w-[200px] md:w-[220px] h-[65px] md:h-[56px]"
        width={220}
        height={46}
      />
    </div>
  );
};

export default MainLogo;
