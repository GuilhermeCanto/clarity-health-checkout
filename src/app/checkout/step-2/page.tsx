"use client"

import { useCheckoutTheme } from "@/components/checkout/checkout-theme-provider"
import { ShippingAddressStep } from "@/components/checkout/shipping-address-step"

export default function ShippingAddressPage() {
  const { dark: isDark, toggleDark } = useCheckoutTheme()

  return (
    <ShippingAddressStep
      dark={isDark}
      routePrefix="/checkout"
      onToggleTheme={toggleDark}
      useStep3Glass
    />
  )
}
