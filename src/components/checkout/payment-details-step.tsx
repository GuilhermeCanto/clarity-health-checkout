"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

import { StatusBar } from "@/components/checkout/status-bar"
import { useHeaderScrolled } from "@/components/checkout/use-header-scrolled"
import { FooterCta } from "@/components/checkout/footer-cta"
import { fadeUp, EASE } from "@/lib/checkout"
import { CARD_FORM_DEFAULTS } from "@/lib/tokens"

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

// Full-size landscape credit card (300×175) matching Figma
function CreditCardPreview({ dark }: { dark: boolean }) {
  return (
    <div
      className="relative h-[175px] w-[300px] overflow-hidden rounded-[24px]"
      style={{
        background: dark
          ? "linear-gradient(125.9deg, rgba(255,255,255,0.51) 3.5%, rgba(255,255,255,0) 111.7%)"
          : "linear-gradient(125.9deg, #c4b5fd 3.5%, #8b5cf6 111.7%)",
        border: "1.758px solid rgba(255,255,255,0.5)",
        backdropFilter: dark ? "blur(10.253px)" : "none",
        WebkitBackdropFilter: dark ? "blur(10.253px)" : "none",
        boxShadow: "14.647px 17.576px 29.294px 0px rgba(0,0,0,0.05)",
      }}
    >
      {/* VISA logo top-right */}
      <span
        className="absolute right-[20px] top-[22px]"
        style={{ color: "#ffffff", fontSize: "14px", fontWeight: 900, letterSpacing: "0.08em" }}
      >
        VISA
      </span>

      {/* Chip */}
      <div
        className="absolute left-[30px] top-[53px] h-[23px] w-[29px] rounded-[4px]"
        style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.7)" }}
      />

      {/* Card number */}
      <span
        className="absolute left-[30px] top-[88px]"
        style={{ color: "#ffffff", fontSize: "16px", fontWeight: 400, lineHeight: "24px", letterSpacing: "0.08em" }}
      >
        4556 3325 8590 3732
      </span>

      {/* Info row */}
      <div className="absolute bottom-[14px] left-[30px] flex gap-[48px]">
        <div>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "8px", fontWeight: 600, lineHeight: "12px" }}>Owner</p>
          <p style={{ color: "#ffffff", fontSize: "9px", fontWeight: 400, lineHeight: "9px", marginTop: "11px" }}>John Doe</p>
        </div>
        <div>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "9px", fontWeight: 600, lineHeight: "12px" }}>Expiry</p>
          <p style={{ color: "#ffffff", fontSize: "9px", fontWeight: 400, lineHeight: "9px", marginTop: "12px" }}>09/31</p>
        </div>
        <div>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "9px", fontWeight: 600, lineHeight: "12px" }}>CVV</p>
          <p style={{ color: "#ffffff", fontSize: "9px", fontWeight: 400, lineHeight: "9px", marginTop: "12px" }}>777</p>
        </div>
      </div>
    </div>
  )
}

// Form input field matching Figma style
function CardField({
  dark,
  label,
  placeholder,
  value,
  onChange,
}: {
  dark: boolean
  label: string
  placeholder: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div
      className="flex flex-col gap-1 rounded-[8px] border px-3 py-2"
      style={{
        background: "transparent",
        borderColor: dark ? "rgba(255,255,255,1)" : "#b2b2b2",
      }}
    >
      <span
        style={{
          color: dark ? "#ede9fe" : "#080e1a",
          fontSize: "14px",
          fontWeight: 700,
          lineHeight: "20px",
        }}
      >
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="border-none bg-transparent p-0 outline-none"
        style={{
          color: "#6d7280",
          fontSize: "12px",
          fontWeight: 500,
          lineHeight: "16px",
        }}
      />
    </div>
  )
}

// Payment brand icons row
const BRAND_ICONS = ["VISA", "DINERS", "MC", "STRIPE", "APPLE PAY"] as const

function PaymentIcons() {
  return (
    <div className="flex items-center gap-4 pt-[30px]">
      {BRAND_ICONS.map((brand) => (
        <div
          key={brand}
          className="flex h-[28px] w-[40px] items-center justify-center rounded-[6px] border"
          style={{
            background: "#ffffff",
            borderColor: "#d9d9d9",
          }}
        >
          <span style={{ color: "#374151", fontSize: "6px", fontWeight: 700, letterSpacing: "0.03em" }}>
            {brand}
          </span>
        </div>
      ))}
    </div>
  )
}

export function PaymentDetailsStep({ dark = false, routePrefix }: PaymentDetailsStepProps) {
  const router = useRouter()
  const [form, setForm] = useState<CardFormState>({ ...CARD_FORM_DEFAULTS })
  const headerScrolled = useHeaderScrolled()

  const set = (key: keyof CardFormState) => (v: string) => setForm((f) => ({ ...f, [key]: v }))

  return (
    <div
      className={["relative min-h-screen font-sans", dark ? "dark" : ""].join(" ")}
      style={{ background: dark ? "#080e1a" : "#f7f7f7" }}
    >
      {/* ── Fixed header ─────────────────────────── */}
      <div className="fixed left-1/2 top-0 z-50 w-full max-w-[390px] -translate-x-1/2 pointer-events-none">
        <div
          className="pointer-events-auto"
          style={{
            background: "var(--c-header-blur)",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            WebkitMaskImage: headerScrolled ? "none" : "linear-gradient(to bottom, black 60%, transparent 100%)",
            maskImage: headerScrolled ? "none" : "linear-gradient(to bottom, black 60%, transparent 100%)",
          }}
        >
          <StatusBar />
        </div>

        <div
          className="pointer-events-auto px-5 pt-2 transition-all duration-200"
          style={{
            background: headerScrolled ? "var(--c-header-blur)" : "transparent",
            backdropFilter: headerScrolled ? "blur(5px)" : "none",
            WebkitBackdropFilter: headerScrolled ? "blur(5px)" : "none",
            WebkitMaskImage: headerScrolled ? "linear-gradient(to bottom, black 0%, black 62%, transparent 100%)" : "none",
            maskImage: headerScrolled ? "linear-gradient(to bottom, black 0%, black 62%, transparent 100%)" : "none",
          }}
        >
          <div className="flex items-center justify-between">
          <motion.button
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => router.push(`${routePrefix}/step-3`)}
            className="relative flex size-[30px] items-center justify-center rounded-full"
            style={{ background: dark ? "rgba(202,210,197,0.16)" : "rgba(255,255,255,0.10)" }}
          >
            <ChevronLeft className="size-[18px]" style={{ color: "var(--c-tx1)" }} strokeWidth={2.2} />
          </motion.button>

          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{ color: "var(--c-tx1)", fontSize: "24px", fontWeight: 700, lineHeight: "28px" }}
          >
            Add New Card
          </motion.h1>

          <div className="size-[30px]" />
          </div>
        </div>
      </div>

      {/* ── Content ──────────────────────────────── */}
      <div className="pb-[140px]" style={{ paddingTop: "114px" }}>
        <div className="mx-auto w-full max-w-[390px] px-5">

          {/* Credit card preview */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex justify-center"
          >
            <CreditCardPreview dark={dark} />
          </motion.div>

          {/* Form fields */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 flex flex-col gap-3"
          >
            <CardField
              dark={dark}
              label="Credit Card Number"
              placeholder="0000 0000 0000 0000"
              value={form.cardNumber}
              onChange={set("cardNumber")}
            />
            <CardField
              dark={dark}
              label="Card Holder Name"
              placeholder="John Doe"
              value={form.cardholderName}
              onChange={set("cardholderName")}
            />
            <div className="flex gap-3">
              <div className="flex-1">
                <CardField
                  dark={dark}
                  label="Expiry Date"
                  placeholder="MM/YY"
                  value={form.expiry}
                  onChange={set("expiry")}
                />
              </div>
              <div className="flex-1">
                <CardField
                  dark={dark}
                  label="CVV"
                  placeholder="999"
                  value={form.cvc}
                  onChange={set("cvc")}
                />
              </div>
            </div>
          </motion.div>

          {/* Payment brand icons */}
          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
            <PaymentIcons />
          </motion.div>

        </div>
      </div>

      {/* ── Bottom CTA ───────────────────────────── */}
      <FooterCta
        label="Continue to Payment"
        onClick={() => router.push(`${routePrefix}/step-3`)}
      />

      {/* Swipe indicator */}
      <div
        className="fixed bottom-2 left-1/2 z-50 h-1 w-9 -translate-x-1/2 rounded-full"
        style={{ background: "rgba(196,181,253,0.5)" }}
      />
    </div>
  )
}
