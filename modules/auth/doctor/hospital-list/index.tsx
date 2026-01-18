import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const DoctorHospitalList = ({ hospitalDuties }: any) => {
  return (
    <ScrollArea className="w-full">
      <div className="flex gap-3">
        {hospitalDuties?.map((duty: any, idx: number) => (
          <div
            key={idx}
            className="
              min-w-[90%] md:min-w-0
              md:w-full
              rounded-lg
              border
              bg-white
              p-3
              text-xs
              text-gray-600
            "
          >
            <p className="font-semibold text-[14px]">{duty.hospitalName}</p>
            <p className="text-gray-500 mt-1">🕒 {duty.dutyTime}</p>
          </div>
        ))}
      </div>

      <ScrollBar orientation="horizontal" className="md:hidden" />
    </ScrollArea>
  );
};

export default DoctorHospitalList;
