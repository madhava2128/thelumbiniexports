/**
 * Site-wide configuration and official company details for The Lumbini Exports.
 */

export interface CompanyAddress {
  label: string;
  line1: string;
  line2?: string;
  villageMandal?: string;
  districtState: string;
  postalCode?: string;
  country: string;
  fullAddress: string;
  googleMapsUrl?: string;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  establishedYear: number;
  contactPerson?: string;
  email: string;
  phone?: string;
  secondaryPhone?: string;
  whatsApp?: string;
  gstNumber?: string;
  iecNumber?: string;
  addresses: {
    physicalUnit: CompanyAddress;
    registeredOffice: CompanyAddress;
  };
  // Compliance & Environmental
  // TODO(client): Enable only after client provides the Telangana State Pollution Control Board GREEN category consent records
  showGreenClassification: boolean;
  socials?: {
    linkedin?: string;
    instagram?: string;
  };
}

const rawPhone = process.env.NEXT_PUBLIC_PHONE?.trim();
const rawWhatsApp = process.env.NEXT_PUBLIC_WHATSAPP?.trim();
const isValidPhone = (val?: string) => Boolean(val && val.length > 5 && !val.includes("["));

export const siteConfig: SiteConfig = {
  name: "The Lumbini Exports",
  legalName: "The Lumbini Exports",
  tagline: "Natural Granite Exporters & Processors",
  description:
    "Precision cutting, polishing, and global export of architectural-grade Indian granite.",
  establishedYear: 2023,
  contactPerson: "Kommaraju Srinadh",
  email: "thelumbiniexports@gmail.com",

  // Primary & secondary contact numbers
  phone: isValidPhone(rawPhone) ? rawPhone : "+91 99082 97199",
  secondaryPhone: "+91 70326 50171",
  whatsApp: isValidPhone(rawWhatsApp) ? rawWhatsApp : "+91 99082 97199",

  // Official Goods and Services Tax Identification Number (India)
  gstNumber: "36AASFT5150GIZV",
  // TODO(client): confirm official Importer Exporter Code (IEC)
  iecNumber: undefined,

  // Compliance & Environmental
  // TODO(client): Enable only after client provides the Telangana State Pollution Control Board GREEN category consent records
  showGreenClassification: false,

  addresses: {
    physicalUnit: {
      label: "Factory & Processing Unit",
      line1: "SyNo 882 B2/2/1/2 882/B1/1",
      villageMandal: "Elkathurthy Mandal",
      districtState: "Hanamkonda, Telangana",
      postalCode: "505476",
      country: "India",
      fullAddress:
        "SyNo 882 B2/2/1/2 882/B1/1, Elkathurthy Mandal, Hanamkonda, Telangana 505476, India",
      googleMapsUrl: "https://maps.app.goo.gl/ctrEZc4ZJCZcuquVA",
    },
    registeredOffice: {
      label: "Registered Corporate Office",
      line1: "H.No. 2-8-14/301, Waddepally",
      districtState: "Hanamkonda, Telangana",
      country: "India",
      fullAddress: "H.No. 2-8-14/301, Waddepally, Hanamkonda, Telangana, India",
    },
  },
};
