import Image from "next/image";
import React from "react";

const MainLogo = () => {
  return (
    <div className="md:mx-3 ">
      <Image
        src="/assets/images/pharma.png"
        alt="PillScript Logo"
        className="object-contain w-[130px] md:w-[180px] "
        width={100}
        height={300}
      />
    </div>
  );
};

export default MainLogo;
