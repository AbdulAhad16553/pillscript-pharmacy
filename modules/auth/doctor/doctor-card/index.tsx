import Image from "next/image";
import React, { useState } from "react";
import { Check, Copy, BadgeCheck, CheckCircle, Cake } from "lucide-react";
import { formatDOB } from "@/lib/helper";
import DoctorHospitalList from "../hospital-list";

const DoctorCard = ({ data }: any) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (value: string, idx: number) => {
    navigator.clipboard.writeText(value);
    setCopiedIndex(idx);

    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className=" rounded-0 md:rounded-[10px] border-t border-[#dfe3e6]  md:border md:border-[#dfe3e6] bg-transparent md:bg-white  w-full shadow-none md:shadow  cursor-pointer transition h-full  flex flex-col">
      <div className="p-2 md:p-4 flex flex-col gap-3">
        <div className="flex items-start gap-4">
          <Image
            src={data.profilePicture}
            alt={data.name}
            width={80}
            height={80}
            className="rounded-lg object-cover border w-20 h-20"
          />

          <div className="flex flex-col gap-1">
            <h2 className="font-semibold text-[14px] md:text-[18px]">
              {data.name}
            </h2>

            <div className="flex flex-row items-center bg-[#eff0f2] text-black text-[12px] w-fit gap-2">
              {data.verified && (
                <CheckCircle size={16} className="text-green-500" />
              )}
              {data.pmdc}
            </div>

            <p className="text-[13px] text-[#8897a2]">{data.specialization}</p>
            <div className="text-sm text-black space-y-1">
              {[data?.phone].map((p: string, idx: number) => (
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
                    <p className="text-xs text-blue-500">
                      Contact has been copied
                    </p>
                  )}
                </div>
              ))}
            </div>
            <p className=" text-gray-400 flex gap-1 items-center text-[13px]">
              <Cake className="text-blue-400" />
              {formatDOB(data.dateOfBirth)}
            </p>
          </div>
        </div>
        <DoctorHospitalList hospitalDuties={data.hospitalDuties} />
        {/* <div className="space-y-1">
          {data?.hospitalDuties?.map((duty: any, idx: number) => (
            <div key={idx} className="text-xs text-gray-600">
              <span className="font-medium">{duty.hospitalName}</span>
              <span className="ml-2 text-gray-500">🕒 {duty.dutyTime}</span>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default DoctorCard;
