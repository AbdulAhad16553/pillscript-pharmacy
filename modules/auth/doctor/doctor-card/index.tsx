import Image from "next/image";
import React, { useState } from "react";
import { Check, Copy, BadgeCheck, CheckCircle, Cake, Mail } from "lucide-react";
import { copyToClipboard, formatDOB } from "@/lib/helper";
import DoctorHospitalList from "../hospital-list";

const DoctorCard = ({ data }: any) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

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

          <div className="flex flex-col gap-1 mt-1">
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
              )}
              {data.pmdc}
            </div>
            <div className="flex flex-col gap-1 mb-1">
              <p className="text-[13px] text-[#8897a2]">
                {data.specialization}
              </p>
              <p className="text-[13px] text-[#8897a2]">
                MBBS,MCPS, FCPS (Obs & Gyn),JMHPE,PGD-PETM
              </p>
            </div>

            <div className="text-sm space-y-1">
              {data?.phones?.map((phone: string, idx: number) => {
                const key = `phone-${idx}`;
                return (
                  <div
                    key={key}
                    onClick={() => copyToClipboard(phone, setCopiedKey, key)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <p>{phone}</p>
                    {copiedKey === key ? (
                      <Check size={14} className="text-blue-500" />
                    ) : (
                      <Copy size={14} className="text-blue-500" />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-2">
              <div
                onClick={() =>
                  copyToClipboard(data.email, setCopiedKey, "email")
                }
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <Mail size={16} />
                <p>{data.email}</p>
                {copiedKey === "email" ? (
                  <Check size={14} className="text-blue-500" />
                ) : (
                  <Copy size={14} className="text-blue-500" />
                )}
              </div>

              <div
                onClick={() => copyToClipboard(data.cnic, setCopiedKey, "cnic")}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <p>CNIC: 1231-012313-1</p>
                {copiedKey === "cnic" ? (
                  <Check size={14} className="text-blue-500" />
                ) : (
                  <Copy size={14} className="text-blue-500" />
                )}
              </div>
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
