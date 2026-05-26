"use client"

import { useState } from "react"

import { SummaryPaymentStep } from "@/components/checkout/summary-payment-step"

export default function Step3Page() {
  const [isDark, setIsDark] = useState(false)

  return (
    <SummaryPaymentStep
      dark={isDark}
      routePrefix="/checkout"
      onToggleTheme={() => setIsDark((v) => !v)}
    />
  )
}
