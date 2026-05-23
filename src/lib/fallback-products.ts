import { Prisma, type Product } from "@prisma/client";

const now = new Date();

export const fallbackProducts: Product[] = [
  {
    id: "preview-tesla-powerwall-3",
    name: "Tesla Powerwall 3",
    slug: "tesla-powerwall-3",
    brand: "Tesla",
    price: new Prisma.Decimal(13990),
    capacity: "13.5 kWh",
    usableCapacity: "13.5 kWh",
    batteryChemistry: "Lithium iron phosphate",
    warrantyYears: 10,
    dimensions: "1099 x 609 x 193 mm",
    weight: "130 kg",
    description:
      "A premium home solar battery option for customers wanting integrated inverter capability, whole-home backup potential, and a well-known battery platform.",
    specs: {
      "Backup support": "Site design dependent",
      "Scalable storage": "Additional units may be supported",
      "Best suited for": "Homes seeking premium backup and solar self-consumption"
    },
    imageUrl: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1200&q=85",
    isFeatured: true,
    isActive: true,
    createdAt: now,
    updatedAt: now
  },
  {
    id: "preview-sungrow-sbr096",
    name: "Sungrow SBR096",
    slug: "sungrow-sbr096",
    brand: "Sungrow",
    price: new Prisma.Decimal(8990),
    capacity: "9.6 kWh",
    usableCapacity: "9.6 kWh",
    batteryChemistry: "Lithium iron phosphate",
    warrantyYears: 10,
    dimensions: "625 x 545 x 330 mm",
    weight: "114 kg",
    description:
      "A modular solar battery system suited to Australian homes looking for flexible capacity, strong value, and trusted inverter compatibility.",
    specs: {
      "System type": "Modular battery storage",
      "Expansion": "Expandable with compatible modules",
      "Best suited for": "Value-focused solar battery storage"
    },
    imageUrl: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=85",
    isFeatured: true,
    isActive: true,
    createdAt: now,
    updatedAt: now
  },
  {
    id: "preview-byd-battery-box-premium-hvm",
    name: "BYD Battery-Box Premium HVM",
    slug: "byd-battery-box-premium-hvm",
    brand: "BYD",
    price: new Prisma.Decimal(10450),
    capacity: "11.0 kWh",
    usableCapacity: "11.0 kWh",
    batteryChemistry: "Lithium iron phosphate",
    warrantyYears: 10,
    dimensions: "585 x 298 x 1411 mm",
    weight: "167 kg",
    description:
      "A scalable battery storage platform for homeowners who want proven LFP chemistry and broad compatibility with selected inverter ecosystems.",
    specs: {
      "System type": "High-voltage modular battery",
      "Chemistry benefit": "Cobalt-free LFP design",
      "Best suited for": "Scalable storage and inverter flexibility"
    },
    imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=85",
    isFeatured: true,
    isActive: true,
    createdAt: now,
    updatedAt: now
  }
];
