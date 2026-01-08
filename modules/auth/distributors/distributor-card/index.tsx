import ShareButton from "@/components/share-button";
import { Copy, Check } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const DistributorCard = ({ dist }: any) => {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (number: string, idx: number) => {
    navigator.clipboard.writeText(number);
    setCopiedIndex(idx);

    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };
  return (
    <div key={dist.id} className="rounded-[10px] border border-[#dfe3e6] bg-white  w-full  cursor-pointer transition h-full  flex flex-col">
    
    <div

      className="p-4 w-full  cursor-pointer transition h-full  flex flex-col"
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
            <h2 className="font-semibold text-[15px] md:text-[17px] lg:text-[20px] ">
              {dist.name} – {dist.district}
            </h2>
            <p className="text-14px] text-[#8897a2]">{dist.type}</p>
          </div>

         
        
      <div className="text-sm text-black mt-1 space-y-1 max-h-16 overflow-auto">
      {dist.phone.map((p: string, idx: number) => (
        <div key={idx}>
          <div
            onClick={() => handleCopy(p, idx)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <p className="truncate">{p}</p>

            {copiedIndex === idx ? (
              <Check size={14} className="text-blue-500" />
            ) : (
              <Copy size={14} className="text-blue-500" />
            )}
          </div>

          {copiedIndex === idx && (
            <p className="text-xs text-blue-500 mt-0.5">
              Contact has been copied
            </p>
          )}
        </div>
      ))}
    </div>
          

        
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
             {dist.address}
          </p>
        </div>
      </div>
   
    </div>
       <div className="block pb-3  md:hidden">
       <ShareButton
  phone={dist.phone?.[0]}
  address={dist.address}
  name={dist.name}
     />
      </div>
      </div>
  );
};

export default DistributorCard;
