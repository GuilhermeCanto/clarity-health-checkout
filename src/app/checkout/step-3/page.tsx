"use client"

import { useCheckoutTheme } from "@/components/checkout/checkout-theme-provider"
import { SummaryPaymentStep } from "@/components/checkout/summary-payment-step"

export default function Step3Page() {
  const { dark: isDark, toggleDark } = useCheckoutTheme()

  return (
    <SummaryPaymentStep
      dark={isDark}
      routePrefix="/checkout"
      onToggleTheme={toggleDark}
    />
  )
}
