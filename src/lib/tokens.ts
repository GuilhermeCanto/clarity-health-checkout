export const PLANS = [
  {
    id: "starter",
    name: "Starter",
    dose: "0.25 mg",
    duration: "1-4 weeks",
    price: 199,
    recommended: true,
  },
  {
    id: "maintenance",
    name: "Maintenance",
    dose: "0.5 mg",
    duration: "5-8 weeks",
    price: 229,
  },
] as const

export const DOSAGE_OPTIONS = ["1-4 weeks", "5-8 weeks", "9+ weeks"] as const
export const STRENGTH_OPTIONS = ["0.25mg", "0.5mg", "1mg"] as const

export const SPECS = [
  { specification: "Generic Name", details: "Semaglutide" },
  { specification: "Drug Class", details: "GLP-1 Receptor Agonist" },
  { specification: "Primary Indication", details: "Weight Management" },
  { specification: "Administration", details: "Subcutaneous Injection" },
  { specification: "Side Effects", details: "Nausea, diarrhea, fatigue" },
] as const

export const DOCTOR = {
  name: "Dr. John Doe",
  specialty: "Expert in Medical Weight Loss",
} as const

export const SAVED_ADDRESSES = [
  {
    id: "home",
    label: "Home",
    recipient: "John Doe",
    address: "8512 Sunset Boulevard, Apt 4B",
    cityStateZip: "Los Angeles, CA 90046",
    phone: "(310) 555-0142",
    default: true,
  },
  {
    id: "office",
    label: "Office",
    recipient: "John Doe",
    address: "1901 Avenue of the Stars, Suite 420",
    cityStateZip: "Los Angeles, CA 90067",
    phone: "(310) 555-0189",
  },
] as const

export const ADDRESS_FORM_DEFAULTS = {
  fullName: "John Doe",
  street: "",
  unit: "",
  city: "",
  state: "",
  zipCode: "",
} as const

export const ORDER_SUMMARY = [
  { label: "Semaglutide Starter", value: "$199" },
  { label: "Medical review", value: "Included" },
  { label: "Priority shipping", value: "$14" },
  { label: "Today total", value: "$213", emphasized: true },
] as const

export const PAYMENT_METHODS = [
  {
    id: "visa",
    brand: "Visa",
    last4: "4242",
    holder: "JOHN DOE",
    expiry: "06/28",
    accentFrom: "#8B5CF6",
    accentTo: "#C4B5FD",
  },
  {
    id: "mastercard",
    brand: "Mastercard",
    last4: "1108",
    holder: "JOHN DOE",
    expiry: "11/27",
    accentFrom: "#1F2937",
    accentTo: "#6D28D9",
  },
] as const

export const CARD_FORM_DEFAULTS = {
  cardholderName: "John Doe",
  cardNumber: "",
  expiry: "",
  cvc: "",
} as const
