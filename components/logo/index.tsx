import Image from "next/image";
import React from "react";

const MainLogo = () => {
  return (
    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
      <Image
        src="/assets/images/logo.png"
        alt="PillScript Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
};

export default MainLogo;
