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
            <h2 className="font-semibold text-[14px] md:text-[20px] tracking-wide word-spacing-6 mb-2 ">
              {data.name}
            </h2>

            <div className="flex flex-row items-center rounded px-1 bg-[#eff0f2] font-bold text-black text-[13px] w-fit gap-1">
              {data.verified && (
                <Image
                  src={"/assets/svg/tick.svg"}
                  alt=""
                  width={12}
                  height={12}
                />
                // <svg
                //   xmlns="http://www.w3.org/2000/svg"
                //   width="12"
                //   height="12"
                //   viewBox="0 0 12 12"
                //   fill="none"
                // >
                //   <path
                //     d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z"
                //     fill="#2A872E"
                //   ></path>
                //   <path
                //     fill-rule="evenodd"
                //     clip-rule="evenodd"
                //     d="M4.12649 8.92613L1.9321 6.57749C1.63167 6.25594 1.64892 5.74722 1.97046 5.44679C2.292 5.14637 2.80073 5.16366 3.10115 5.48516L4.79381 7.29678L7.47307 4.79345C7.49717 4.77092 7.52235 4.75027 7.54838 4.73128L8.80833 3.5541C9.12988 3.25368 9.63865 3.27097 9.93903 3.59251C10.2395 3.91401 10.2222 4.42278 9.90066 4.7232L6.05244 8.31871L6.04833 8.31432L4.71718 9.55807L4.12649 8.92613Z"
                //     fill="white"
                //   ></path>
                // </svg>

                // <CheckCircle size={16} className="text-green-500" />
              )}
              {data.pmdc}
            </div>

            <p className="text-[13px] text-[#8897a2]">{data.specialization}</p>
            <p className="text-[13px] text-[#8897a2]">
              MBBS,MCPS, FCPS (Obs & Gyn),JMHPE,PGD-PETM
            </p>

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
            <div className="flex flex-col  md:flex-row items-center justify-between gap-3">
              <p className="flex gap-2 text-sm">Email: {data.email}</p>
              <p className="flex gap-2 text-sm">CNIC: {data.cnic}</p>
              <p className=" text-gray-400 flex gap-2  items-center text-[13px]">
                <Image
                  src="/assets/images/cake.png"
                  alt="cake"
                  width={20}
                  height={20}
                  className="object-contain"
                />

                <p> {formatDOB(data.dateOfBirth)}</p>
              </p>
            </div>
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
