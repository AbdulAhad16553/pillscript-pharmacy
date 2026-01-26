//menu data
export const MenuData = [
  {
    id: 1,
    label: "Home",
    href: "/",
  },
  {
    id: 2,
    label: "Find Colleagues",
    href: "#colleagues",
  },
  {
    id: 3,
    label: "Distributors",
    href: "/distributors",
  },
  {
    id: 4,
    label: "WhatsApp Groups",
    href: "#whatsapp",
  },
  {
    id: 5,
    label: "Doctor List",
    href: "doctor",
  },
];

export const distributors = [
  {
    id: 1,
    name: "Everherb (By Pharmeasy) Flaxseed Omega 3 - Essential Fatty Acids - Healthy Heart - Bottle Of 60",
    type: "Pharmaceutical Distributor",
    phone: ["0300 1234567", "0300 7654321"],
    district: "Lahore",
    address: "Plot 12, Industrial Area, Gulberg, Lahore",
    logo: "/assets/images/dsitributor.jpg",
  },
  {
    id: 2,
    name: "LifeLine Medicines Depot",
    type: "Medical Supplies",
    phone: ["0321 9876543", "0321 3456789"],
    district: "Karachi",
    address: "Block B, SITE Area, Karachi",
    logo: "/assets/images/dsitributor.jpg",
  },
  {
    id: 3,
    name: "PrimeMed Distributions",
    type: "Pharma Wholesale",
    phone: ["0333 4567890", "0333 0987654"],
    district: "Islamabad",
    address: "I-10 Markaz, Islamabad",
    logo: "/assets/images/dsitributor.jpg",
  },
  {
    id: 4,
    name: "CurePlus Pharma Services",
    type: "Pharmaceutical Distributor",
    phone: ["0312 1122334", "0312 4433221"],
    district: "Rawalpindi",
    address: "Satellite Town, Rawalpindi",
    logo: "/assets/images/dsitributor.jpg",
  },
  {
    id: 5,
    name: "MedTrust Distributors",
    type: "Healthcare Products",
    phone: ["0345 6677889", "0345 9988776"],
    district: "Faisalabad",
    address: "Peoples Colony No. 1, Faisalabad",
    logo: "/assets/images/dsitributor.jpg",
  },
  // ----------- New dummy distributor -----------
  {
    id: 6,
    name: "Global Pharma Solutions",
    type: "Medical Supplies",
    phone: ["0355 1122334", "0355 5566778"],
    district: "Multan",
    address: "Phase 2, Industrial Estate, Multan",
    logo: "/assets/images/dsitributor.jpg",
  },
];

export const COMPANY_OPTIONS = ["Unilever", "Nestle", "Pepsi"];

export const DISTRICT_TOWNS: Record<string, string[]> = {
  Lahore: ["Model Town", "Gulberg", "Johar Town"],
  Karachi: ["Clifton", "Defence", "North Nazimabad"],
  Islamabad: ["F-6", "F-7", "G-11"],
};

export const dummyDoctorData = [
  {
    id: 1,
    profilePicture: "/assets/images/doctor_1.png",
    name: "Dr. Ahmed Khan",
    email: "ahmed.khan@pillscript.com",
    cnic: "37405-1234567-1",
    verified: true,
    pmdc: "PMDC 7860-P",
    specialization: "Cardiologist",
    dateOfBirth: "1985-04-12",
    phones: ["+92 300 1234567", "+92 301 7654321"],
    hospitalDuties: [
      {
        hospitalName: "Shifa International Hospital",
        dutyTime: "08:00 AM - 02:00 PM",
      },
      {
        hospitalName: "Aga Khan University Hospital",
        dutyTime: "04:00 PM - 08:00 PM",
      },
    ],
  },
  {
    id: 2,
    profilePicture: "/assets/images/doctor_1.png",
    name: "Dr. Sara Malik",
    email: "sara.malik@pillscript.com",
    cnic: "42101-9876543-2",
    verified: true,
    pmdc: "PMDC 9123-P",
    specialization: "Gynecologist",
    dateOfBirth: "1988-09-25",
    phones: ["+92 321 9876543", "+92 322 1239876", "+92 300 5558899"],
    hospitalDuties: [
      {
        hospitalName: "Liaquat National Hospital",
        dutyTime: "09:00 AM - 01:00 PM",
      },
      {
        hospitalName: "Ziauddin Hospital",
        dutyTime: "03:00 PM - 07:00 PM",
      },
    ],
  },
  {
    id: 3,
    profilePicture: "/assets/images/doctor_1.png",
    name: "Dr. Usman Raza",
    email: "usman.raza@pillscript.com",
    cnic: "61101-4567890-3",
    verified: false,
    pmdc: "PMDC 6541-P",
    specialization: "Orthopedic Surgeon",
    dateOfBirth: "1982-11-03",
    phones: ["+92 333 4567890", "+92 334 1122334"],
    hospitalDuties: [
      {
        hospitalName: "CMH Rawalpindi",
        dutyTime: "10:00 AM - 02:00 PM",
      },
    ],
  },
  {
    id: 4,
    profilePicture: "/assets/images/doctor_1.png",
    name: "Dr. Ayesha Noor",
    email: "ayesha.noor@pillscript.com",
    cnic: "35202-9988776-4",
    verified: true,
    pmdc: "PMDC 3344-P",
    specialization: "Dermatologist",
    dateOfBirth: "1990-02-18",
    phones: ["+92 345 9988776", "+92 346 6677889"],
    hospitalDuties: [
      {
        hospitalName: "Pakistan Institute of Medical Sciences",
        dutyTime: "01:00 PM - 05:00 PM",
      },
    ],
  },
  {
    id: 5,
    profilePicture: "/assets/images/doctor_1.png",
    name: "Dr. Bilal Hussain",
    email: "bilal.hussain@pillscript.com",
    cnic: "36501-6655443-5",
    verified: false,
    pmdc: "PMDC 7788-P",
    specialization: "Neurologist",
    dateOfBirth: "1983-06-30",
    phones: ["+92 312 6655443", "+92 313 9988776", "+92 300 1122334"],
    hospitalDuties: [
      {
        hospitalName: "Maroof International Hospital",
        dutyTime: "11:00 AM - 04:00 PM",
      },
    ],
  },
];

export const specialityData = [
  "Cardiologist",
  "Dermatologist",
  "Dentist",
  "Gynecologist",
  "Neurologist",
  "Orthopedic",
  "Pediatrician",
  "Psychiatrist",
  "Urologist",
];

export const districtData = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
];

export const cityTownData = [
  "DHA",
  "Gulberg",
  "Johar Town",
  "Clifton",
  "Saddar",
];

export const genderData = ["Male", "Female"];
