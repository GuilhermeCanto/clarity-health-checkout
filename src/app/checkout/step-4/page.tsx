"use client"

import { useCheckoutTheme } from "@/components/checkout/checkout-theme-provider"
import { PaymentDetailsStep } from "@/components/checkout/payment-details-step"

export default function Step4Page() {
  const { dark } = useCheckoutTheme()

  return <PaymentDetailsStep dark={dark} routePrefix="/checkout" />
}
