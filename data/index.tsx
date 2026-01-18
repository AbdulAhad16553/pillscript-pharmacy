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
    profilePicture: "/assets/images/doctor1.jfif",
    name: "Dr. Ahmed Khan",
    verified: true,
    pmdc: "PMDC 7860-P",
    specialization: "Cardiologist",
    dateOfBirth: "1985-04-12",
    phone: "+92 300 1234567",
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
    profilePicture: "/assets/images/doctor1.jfif",
    name: "Dr. Sara Malik",
    verified: true,
    pmdc: "PMDC 9123-P",
    specialization: "Gynecologist",
    dateOfBirth: "1988-09-25",
    phone: "+92 321 9876543",
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
];
