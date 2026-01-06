import Image from "next/image";
import React from "react";

const DistributorCard = ({ dist }: any) => {
  return (
    <div
      key={dist.id}
      className="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition h-full max-h-60 md:max-h-44 flex flex-col"
    >
      <div className="flex items-start gap-4">
       
        <Image
          src={dist.logo}
          alt={dist.name}
          width={80}
          height={80}
          className="rounded-lg object-cover border w-20 h-20"
        />

       
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="font-semibold text-sm line-clamp-1">
              {dist.name} – {dist.district}
            </h2>
            <p className="text-xs text-gray-500">{dist.type}</p>
          </div>

         
          <div className="text-sm text-black mt-1 space-y-0.5 max-h-16 overflow-auto">
            {dist.phone.map((p: string, idx: number) => (
              <p key={idx} className="truncate">
               {p}
              </p>
            ))}
          </div>

        
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
             {dist.address}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DistributorCard;
