"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Wallet } from "lucide-react"
import { useRouter } from "next/navigation"

import { checkoutThemeValue } from "@/components/checkout/theme-utils"
import { Divider } from "@/components/checkout/divider"
import { FooterCta } from "@/components/checkout/footer-cta"
import { CheckoutPageFrame } from "@/components/checkout/page-frame"
import {
  PaymentCard,
  SectionTitleRow,
  SummaryCard,
} from "@/components/checkout/checkout-primitives"
import { ORDER_SUMMARY, PAYMENT_METHODS, SAVED_ADDRESSES } from "@/lib/tokens"
import { fadeUp } from "@/lib/checkout"

interface SummaryPaymentStepProps {
  dark?: boolean
  routePrefix: string
}

export function SummaryPaymentStep({ dark = false, routePrefix }: SummaryPaymentStepProps) {
  const router = useRouter()
  const [selectedCard, setSelectedCard] = useState<string>(PAYMENT_METHODS[0].id)
  const [shippingAddress, setShippingAddress] = useState<any>(SAVED_ADDRESSES[0])

  useEffect(() => {
    const savedActiveId = localStorage.getItem("bask_selected_address_id")
    const customAddresses = localStorage.getItem("bask_addresses")
    let list: any[] = [
      {
        id: "current_location",
        label: "Current Location",
        recipient: "John Doe",
        address: "555 Madison Avenue",
        cityStateZip: "New York, NY 10022",
        phone: "(212) 555-0199",
      },
      ...SAVED_ADDRESSES,
    ]
    if (customAddresses) {
      try {
        const parsed = JSON.parse(customAddresses)
        const extra = parsed.filter((item: any) => item.id !== "current_location")
        list = [list[0], ...extra, ...SAVED_ADDRESSES]
      } catch (e) {}
    }
    if (savedActiveId) {
      const found = list.find((a) => a.id === savedActiveId)
      if (found) {
        setShippingAddress(found)
      }
    }
  }, [])

  const hero = (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: dark
            ? "radial-gradient(circle at 50% 10%, rgba(139,92,246,0.24), transparent 30%), linear-gradient(180deg, rgba(18,24,48,0.18), rgba(8,14,26,0.94))"
            : "radial-gradient(circle at 50% 10%, rgba(167,139,250,0.34), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.42), rgba(247,247,247,0.94))",
        }}
      />
      <div className="absolute inset-x-9 top-[108px]">
        <div className="grid gap-3">
          {PAYMENT_METHODS.slice(0, 2).map((card, index) => (
            <div
              key={card.id}
              className="transition-transform duration-300"
              style={{ transform: `translateX(${index === 0 ? 0 : 36}px) translateY(${index === 0 ? 0 : -82}px) rotate(${index === 0 ? -6 : 7}deg)` }}
            >
              <PaymentCard {...card} />
            </div>
          ))}
        </div>
      </div>
    </>
  )

  return (
    <CheckoutPageFrame
      dark={dark}
      backHref={`${routePrefix}/step-2`}
      footer={
        <FooterCta
          icon={<ArrowRight className="size-4 text-white" strokeWidth={2.5} />}
          label="Review payment"
          onClick={() => router.push(`${routePrefix}/step-4`)}
        />
      }
      hero={hero}
      title="Payment"
    >
      <div className="space-y-6">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <SummaryCard items={ORDER_SUMMARY} />
        </motion.div>

        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" className="flex justify-center">
          <button
            className="glass-rim inline-flex items-center gap-2 rounded-full px-4 py-2"
            style={{
              background: dark ? "rgba(255,255,255,0.08)" : "#EDE9FE",
              boxShadow: "0px 0px 2px 2px rgba(120,120,120,0.2), inset 2px 2px 1px 0px rgba(255,255,255,0.2)",
              color: "var(--c-tx2)",
            }}
          >
            <Wallet className="size-3.5 text-brand" strokeWidth={2.2} />
            <span style={{ fontSize: "11px", fontWeight: 600, lineHeight: "16px" }}>Edit your order</span>
          </button>
        </motion.div>

        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
          <SectionTitleRow
            title="Payment Methods"
            actionLabel="Add New"
            onAction={() => router.push(`${routePrefix}/step-4`)}
          />
        </motion.div>

        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
          <div className="grid gap-3">
            {PAYMENT_METHODS.map((card) => (
              <button key={card.id} onClick={() => setSelectedCard(card.id)} className="text-left">
                <PaymentCard {...card} selected={selectedCard === card.id} />
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible">
          <Divider />
        </motion.div>

        <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible" className="space-y-4">
          <SectionTitleRow
            title="Shipping"
            actionLabel="Edit"
            onAction={() => router.push(`${routePrefix}/step-2`)}
          />
          <div
            className="glass-rim flex items-start gap-3 rounded-xl px-4 py-4"
            style={{
              background: "var(--c-cell-bg)",
              boxShadow: "var(--c-unsel-shadow)",
            }}
          >
            <div
              className="flex size-10 shrink-0 items-center justify-center rounded-full"
              style={{ background: checkoutThemeValue(dark, "rgba(255,255,255,0.08)", "rgba(139,92,246,0.14)") }}
            >
              <Wallet className="size-4 text-brand" strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-h6" style={{ color: "var(--c-tx1)" }}>
                {shippingAddress.recipient}
              </p>
              <p className="mt-1 text-xs leading-4" style={{ color: "var(--c-tx2)" }}>
                {shippingAddress.address}
              </p>
              <p className="text-xs leading-4" style={{ color: "var(--c-tx2)" }}>
                {shippingAddress.cityStateZip}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </CheckoutPageFrame>
  )
}
