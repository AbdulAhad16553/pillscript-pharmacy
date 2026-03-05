"use client";

import Container from "@/components/container";
import DoctorCard from "./doctor-card";
import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import DoctorFilter from "./doctor-filter";
import DoctorMobileFilter from "./doctor-mobile-filter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { client } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { toast } from "sonner";
import { useAuthenticationStatus } from "@nhost/nextjs";
import { dummyDoctorData } from "@/data";

const GET_DOCTOR = gql`
  query GetDoctor {
    doctor {
      id
      title_id
      image_id
      pmdc
      doctor_name
      father_name
      speciality
      qualifications
      blood_group
      gender
      date_of_birth
      cnic
      phone_number
      secondary_phone_number
      email
      created_at
      updated_at
      doctor_clinics {
        id
        clinic_number
        clinic_detail
      }
      doctor_specialty_maps {
        id
        specialty: doctor_specialty {
          id
          name
        }
      }
      doctor_qualification_maps {
        id
        qualification: doctor_qualification {
          id
          name
        }
        degree_specialization: doctor_degree_specialization {
          id
          name
        }
      }
    }
  }
`;

const DoctorList = () => {
  const { isAuthenticated } = useAuthenticationStatus();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const { data } = await client.query<{ doctor: any[] }>({
          query: GET_DOCTOR,
          fetchPolicy: "network-only",
        });

        const mappedDoctors =
          data?.doctor?.map((d: any) => ({
            id: d.id,
            profilePicture: d.image_id
              ? `https://lfgwnrkyoofwbvejrpqm.storage.eu-central-1.nhost.run/v1/files/${d.image_id}`
              : "/assets/svg/logo2.svg",
            name: d.doctor_name,
            email: d.email,
            cnic: d.cnic,
            verified: !!d.pmdc,
            pmdc: d.pmdc,
            specialization:
              d.speciality ||
              d.doctor_specialty_maps?.[0]?.specialty?.name ||
              "",
            qualifications: d.qualifications ?? [],
            degreeSpecialization:
              d.doctor_qualification_maps?.[0]?.degree_specialization?.name ??
              undefined,
            dateOfBirth: d.date_of_birth,
            phones: [
              d.phone_number,
              d.secondary_phone_number,
            ].filter(Boolean),
            hospitalDuties:
              d.doctor_clinics?.map((clinic: any) => ({
                hospitalName: clinic.clinic_detail || clinic.clinic_number,
                dutyTime: clinic.clinic_number || "",
              })) || [],
          })) ?? [];

        setDoctors(mappedDoctors);
      } catch (error: any) {
        toast.error(error.message || "Failed to load doctors");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchDoctors();
    } else {
      setDoctors([]);
      setLoading(false);
    }
  }, [isAuthenticated]);

  const sourceDoctors = isAuthenticated ? doctors : dummyDoctorData;

  const filteredDoctors = sourceDoctors.filter((doctor) =>
    doctor.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const removeFilter = (key: any, value: string) => {
    setSelectedFilters((prev: any) => {
      const updatedValues = prev[key]?.filter((v: any) => v !== value);

      return {
        ...prev,
        [key]:
          updatedValues && updatedValues.length > 0 ? updatedValues : undefined,
      };
    });
  };

  return (
    <Container className="w-full lg:max-w-[60%]">
      <div className="flex  flex-row  justify-between items-center mt-5 md:mt-10 gap-3">
        <div className="relative w-full sm:w-80 md:w-full">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-black"
            size={18}
          />

          <Input
            placeholder={isFocused ? "" : "Search by Doctor Name..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="pl-10 w-full"
          />
        </div>
        <div className="block md:hidden">
          <DoctorMobileFilter
            data={filteredDoctors}
            setSelectedFilters={setSelectedFilters}
            selectedFilters={selectedFilters}
          />
        </div>
        <div className="hidden md:block">
          <DoctorFilter
            data={filteredDoctors}
            selectedFilters={selectedFilters}
            setSelectedFilter={setSelectedFilters}
          />
        </div>
      </div>

      {/* //get selected filters */}
      <ScrollArea className="w-full">
        <div className="flex gap-2 mt-4 mb-4 ">
          {Object.entries(selectedFilters).map(([key, values]: any) =>
            values?.map((val: any) => (
              <span
                key={`${key}-${val}`}
                className="flex-shrink-0 flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-none text-sm"
              >
                {val}
                <X
                  size={14}
                  className="cursor-pointer"
                  onClick={() => removeFilter(key as any, val)}
                />
              </span>
            ))
          )}
        </div>
        <ScrollBar orientation="horizontal" className="" />
      </ScrollArea>

      <div className="grid grid-cols-1 gap-4 md:gap-6 mt-6">
        {loading ? (
          <p className="text-gray-500 text-center">Loading doctors...</p>
        ) : filteredDoctors.length > 0 ? (
          filteredDoctors.map((item) => (
            <DoctorCard key={item.id} data={item} />
          ))
        ) : (
          <p className="text-gray-500 text-center">No Doctors found.</p>
        )}
      </div>
    </Container>
  );
};

export default DoctorList;
