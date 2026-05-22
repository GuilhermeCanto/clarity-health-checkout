"use client"

import { useState } from "react"

import { ShippingAddressStep } from "@/components/checkout/shipping-address-step"

export default function ShippingAddressPage() {
  const [isDark, setIsDark] = useState(false)

  return (
    <ShippingAddressStep
      dark={isDark}
      routePrefix="/checkout"
      onToggleTheme={() => setIsDark((v) => !v)}
    />
  )
}
