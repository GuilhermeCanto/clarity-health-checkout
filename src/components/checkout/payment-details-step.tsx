"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, LockKeyhole } from "lucide-react"
import { useRouter } from "next/navigation"

import { FooterCta } from "@/components/checkout/footer-cta"
import { CheckoutPageFrame } from "@/components/checkout/page-frame"
import {
  FormField,
  PaymentCard,
} from "@/components/checkout/checkout-primitives"
import { fadeUp } from "@/lib/checkout"
import { CARD_FORM_DEFAULTS, PAYMENT_METHODS } from "@/lib/tokens"

interface PaymentDetailsStepProps {
  dark?: boolean
  routePrefix: string
}

type CardFormState = {
  cardholderName: string
  cardNumber: string
  expiry: string
  cvc: string
}

export function PaymentDetailsStep({ dark = false, routePrefix }: PaymentDetailsStepProps) {
  const router = useRouter()
  const [form, setForm] = useState<CardFormState>({ ...CARD_FORM_DEFAULTS })

  const hero = (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: dark
            ? "radial-gradient(circle at 50% 12%, rgba(139,92,246,0.24), transparent 32%), linear-gradient(180deg, rgba(18,24,48,0.18), rgba(8,14,26,0.94))"
            : "radial-gradient(circle at 50% 12%, rgba(167,139,250,0.34), transparent 32%), linear-gradient(180deg, rgba(255,255,255,0.42), rgba(247,247,247,0.94))",
        }}
      />
      <div className="absolute inset-x-10 top-[108px]">
        <PaymentCard {...PAYMENT_METHODS[0]} selected />
      </div>
    </>
  )

  return (
    <CheckoutPageFrame
      dark={dark}
      backHref={`${routePrefix}/step-3`}
      footer={
        <FooterCta
          icon={<CheckCircle2 className="size-4 text-white" strokeWidth={2.4} />}
          label="Save card"
          onClick={() => router.push(`${routePrefix}/step-3`)}
        />
      }
      hero={hero}
      title="Add New Card"
      titleSize="h5"
    >
      <div className="space-y-5">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <div className="flex items-center justify-center gap-2">
            <LockKeyhole className="size-4 text-brand" strokeWidth={2.3} />
            <span style={{ color: "var(--c-tx2)", fontSize: "12px", fontWeight: 600, lineHeight: "16px" }}>
              Encrypted and PCI-compliant checkout
            </span>
          </div>
        </motion.div>

        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" className="space-y-3">
          <FormField
            label="Cardholder Name"
            placeholder="John Doe"
            value={form.cardholderName}
            onChange={(value) => setForm((current) => ({ ...current, cardholderName: value }))}
          />
          <FormField
            label="Card Number"
            placeholder="1234 5678 9012 3456"
            value={form.cardNumber}
            onChange={(value) => setForm((current) => ({ ...current, cardNumber: value }))}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              label="Expiry"
              placeholder="MM/YY"
              value={form.expiry}
              onChange={(value) => setForm((current) => ({ ...current, expiry: value }))}
            />
            <FormField
              label="CVC"
              placeholder="123"
              value={form.cvc}
              onChange={(value) => setForm((current) => ({ ...current, cvc: value }))}
            />
          </div>
        </motion.div>

        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
          <div
            className="glass-rim rounded-xl px-4 py-4"
            style={{
              background: "var(--c-cell-bg)",
              boxShadow: "var(--c-unsel-shadow)",
            }}
          >
            <p className="text-h6" style={{ color: "var(--c-tx1)" }}>
              Billing reminder
            </p>
            <p className="mt-1 text-xs leading-4" style={{ color: "var(--c-tx2)" }}>
              You will only be charged after your prescription is reviewed and the pharmacy prepares your shipment.
            </p>
          </div>
        </motion.div>
      </div>
    </CheckoutPageFrame>
  )
}
