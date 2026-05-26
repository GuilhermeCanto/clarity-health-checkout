"use client"

import { motion } from "framer-motion"
import { ChevronLeft, Home, Moon, Plus, Pencil, Sun } from "lucide-react"
import { useRouter } from "next/navigation"

import { StatusBar } from "@/components/checkout/status-bar"
import { useHeaderScrolled } from "@/components/checkout/use-header-scrolled"
import { FooterCta } from "@/components/checkout/footer-cta"
import { fadeUp, EASE } from "@/lib/checkout"
import { PAYMENT_METHODS, SAVED_ADDRESSES } from "@/lib/tokens"

const STEP3_ARCH_CLIP_PATH =
  "path('M 183,0 C 220,0 250,12 250,28 L 324,28 Q 366,28 366,76 L 366,4000 Q 366,4028 338,4028 L 28,4028 Q 0,4028 0,4000 L 0,76 Q 0,28 42,28 L 116,28 C 116,12 146,0 183,0 Z')"

interface SummaryPaymentStepProps {
  dark?: boolean
  onToggleTheme?: () => void
  routePrefix: string
}

function GlassSurface({
  dark,
  radius,
  padding,
  className = "",
  lightBackground = "rgb(var(--theme-accent-soft-rgb) / 0.10)",
  lightBorder = "1px solid rgb(var(--theme-accent-soft-rgb) / 0.14)",
  lightBlur = "18px",
  lightShadow = "0 8px 22px rgba(15,23,42,0.07), 0 2px 7px rgb(var(--theme-accent-soft-rgb) / 0.08)",
  children,
}: {
  dark: boolean
  radius: number
  padding: string
  className?: string
  lightBackground?: string
  lightBorder?: string
  lightBlur?: string
  lightShadow?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`.trim()}
      style={{
        borderRadius: `${radius}px`,
        padding,
        background: dark ? "rgba(255,255,255,0.015)" : lightBackground,
        border: dark ? "1px solid rgba(255,255,255,0.10)" : lightBorder,
        backdropFilter: dark ? "blur(18px)" : `blur(${lightBlur})`,
        WebkitBackdropFilter: dark ? "blur(18px)" : `blur(${lightBlur})`,
        boxShadow: dark ? "0 6px 18px rgba(0,0,0,0.10)" : lightShadow,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: `${radius}px`,
          background: dark
            ? "linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.012) 44%, transparent 100%)"
            : "linear-gradient(135deg, rgb(var(--theme-accent-soft-rgb) / 0.36) 0%, rgb(var(--theme-accent-soft-rgb) / 0.14) 44%, transparent 100%)",
          opacity: dark ? 0.55 : 0.78,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}

function MiniCard({ dark, brand, last4 }: {
  dark: boolean
  brand: string
  last4: string
}) {
  return (
    <div
      className="relative h-[130px] w-[100px] shrink-0 overflow-hidden rounded-[14px]"
      style={{
        background: dark
          ? "linear-gradient(145deg, #232939 0%, #1d2331 48%, #2a3040 100%)"
          : "var(--brand-primary)",
        boxShadow: dark ? "0px 8px 28px rgba(0,0,0,0.22)" : "0px 4px 24.5px rgba(0,0,0,0.25)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: dark
            ? "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 42%, transparent 68%)"
            : "linear-gradient(145deg, rgba(255,255,255,0.22) 0%, transparent 55%)",
        }}
      />
      <span
        className="absolute left-[10px] top-[10px]"
        style={{ color: "#dedede", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em" }}
      >
        {brand.toUpperCase()}
      </span>
      <span
        className="absolute bottom-[14px] left-[10px]"
        style={{ color: "#dedede", fontSize: "9px", fontWeight: 400, lineHeight: "16px" }}
      >
        ***** {last4}
      </span>
    </div>
  )
}

function LocationCard({ dark }: { dark: boolean }) {
  return (
    <GlassSurface
      dark={dark}
      radius={12}
      padding="12px 24px"
      className="w-full"
      lightBlur="30px"
    >
      <div className="flex items-center gap-[10px]">
        <div className="relative shrink-0 size-[34px]">
          <div
            className="absolute inset-0 rounded-[4px]"
            style={{
              background: "var(--brand-primary)",
              boxShadow: dark
                ? "0px 0px 6px 2px rgb(var(--theme-accent-soft-rgb) / 0.14)"
                : "0px 0px 6px 2px rgb(var(--theme-accent-soft-rgb) / 0.28)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Home className="size-[15px] text-white" strokeWidth={2} />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-[10px]">
            <span
              style={{
                color: dark ? "#ffffff" : "#080e1a",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "20px",
                whiteSpace: "nowrap",
              }}
            >
              Customer&apos;s Home
            </span>
            <span
              className="flex h-[16px] shrink-0 items-center justify-center rounded-full border border-white px-2"
              style={{
                background: "rgb(var(--theme-accent-pale-rgb) / 0.95)",
                color: "var(--brand-primary)",
                fontSize: "9px",
                fontWeight: 600,
                lineHeight: "9px",
                whiteSpace: "nowrap",
              }}
            >
              Regular Shipping
            </span>
          </div>
          <p
            className="mt-[2px]"
            style={{
              color: dark ? "#ffffff" : "#9ca3af",
              fontSize: "12px",
              fontWeight: 400,
              lineHeight: "16px",
            }}
          >
            {SAVED_ADDRESSES[0].address}, {SAVED_ADDRESSES[0].cityStateZip}
          </p>
        </div>
      </div>
    </GlassSurface>
  )
}

function OrderSummaryCard({ dark }: { dark: boolean }) {
  return (
    <GlassSurface dark={dark} radius={16} padding="24px" className="w-full">
      <div className="flex flex-col gap-[10px]">
        {/* Header */}
        <div className="flex items-start justify-between whitespace-nowrap">
          <span style={{ color: dark ? "#ffffff" : "#080e1a", fontSize: "16px", fontWeight: 600, lineHeight: "20px" }}>
            Your order summary
          </span>
          <span style={{ color: dark ? "#ffffff" : "#080e1a", fontSize: "14px", fontWeight: 600, lineHeight: "20px" }}>
            $206
          </span>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full"
          style={{ background: dark ? "rgb(var(--theme-accent-soft-rgb) / 0.3)" : "rgb(var(--theme-accent-soft-rgb) / 0.6)" }}
        />

        {/* Product row */}
        <div className="flex items-center gap-8">
          <div
            className="relative flex shrink-0 size-[60px] items-center justify-center overflow-hidden rounded-[8px]"
            style={{ background: "#f7f7f7" }}
          >
            <img src="/semaglutide.png" alt="Semaglutide" className="absolute inset-0 size-full object-cover" />
          </div>

          <div className="flex flex-1 flex-col gap-[2px]">
            <span style={{ color: dark ? "#ffffff" : "#080e1a", fontSize: "16px", fontWeight: 600, lineHeight: "24px" }}>
              Semaglutide
            </span>
            <div className="flex items-center justify-between">
              <span style={{ color: dark ? "#ffffff" : "#080e1a", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>Strength:</span>
              <span style={{ color: dark ? "#ffffff" : "#080e1a", fontSize: "12px", fontWeight: 400, lineHeight: "16px", textAlign: "right", width: "70px" }}>0.25 mg</span>
            </div>
            <div className="flex items-center justify-between">
              <span style={{ color: dark ? "#ffffff" : "#080e1a", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>Dosage:</span>
              <span style={{ color: dark ? "#ffffff" : "#080e1a", fontSize: "12px", fontWeight: 400, lineHeight: "16px", textAlign: "right", width: "70px" }}>1-4 weeks</span>
            </div>
          </div>
        </div>

        {/* Edit your order — centered at bottom of card */}
        <div className="flex justify-center pt-2">
          <button
            className="flex items-center gap-1 overflow-hidden rounded-full border border-white px-3 py-1"
            style={{
              background: "rgb(var(--theme-accent-pale-rgb) / 0.95)",
              boxShadow: "0px 0px 2px 2px rgba(120,120,120,0.2), inset 2px 2px 1px 0px rgba(255,255,255,0.2)",
              color: "#4b5563",
              fontSize: "8px",
              fontWeight: 600,
              lineHeight: "16px",
            }}
          >
            <span>Edit your order</span>
            <Pencil className="size-[8px]" strokeWidth={2} />
          </button>
        </div>
      </div>
    </GlassSurface>
  )
}

function SectionButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void; dark?: boolean }) {
  return (
    <button
      onClick={onClick}
      className="glass-rim flex items-center gap-1.5 rounded-[8px] px-3 py-1.5"
      style={{
        background: "var(--c-cell-bg)",
        boxShadow: "var(--c-unsel-shadow)",
        color: "var(--c-tx2)",
        fontSize: "12px",
        fontWeight: 600,
        lineHeight: "16px",
      }}
    >
      {children}
    </button>
  )
}

export function SummaryPaymentStep({ dark = false, onToggleTheme, routePrefix }: SummaryPaymentStepProps) {
  const router = useRouter()
  const headerScrolled = useHeaderScrolled()
  const archGlassInset = "0px"
  const archGlassInnerInset = "2px"

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
            onClick={() => router.push(`${routePrefix}/step-2`)}
            className="relative flex size-[30px] items-center justify-center rounded-full"
            style={{ background: dark ? "rgba(202,210,197,0.16)" : "rgba(255,255,255,0.10)" }}
          >
            <ChevronLeft className="size-[18px]" style={{ color: "var(--c-tx1)" }} strokeWidth={2.2} />
          </motion.button>

          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{ color: "var(--c-tx1)", fontSize: "28px", fontWeight: 700, lineHeight: "34px" }}
          >
            Payment
          </motion.h1>

          {onToggleTheme ? (
            <motion.button
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              onClick={onToggleTheme}
              className="relative flex size-[30px] items-center justify-center rounded-full"
              style={{ background: dark ? "rgba(202,210,197,0.16)" : "rgba(255,255,255,0.10)" }}
            >
              {dark
                ? <Sun className="size-[16px]" style={{ color: "var(--c-tx1)" }} strokeWidth={2.2} />
                : <Moon className="size-[16px]" style={{ color: "var(--c-tx1)" }} strokeWidth={2.2} />
              }
            </motion.button>
          ) : (
            <div className="size-[30px]" />
          )}
          </div>
        </div>
      </div>

      {/* ── Arch glass card — Payment Methods + Shipping ── */}
      <div className="relative mx-3 z-10 mt-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative"
        >
          {/* Rotated arch shape with the same glass treatment as the order summary */}
          <div
            className="absolute inset-0"
            style={{
              inset: archGlassInset,
              transform: "rotate(180deg)",
              clipPath: STEP3_ARCH_CLIP_PATH,
              background: dark
                ? "linear-gradient(315deg, rgba(255,255,255,0.015) 0%, rgba(255,255,255,0.08) 22%, rgba(255,255,255,0.05) 56%, rgba(255,255,255,0.025) 100%)"
                : "linear-gradient(315deg, rgb(var(--theme-accent-soft-rgb) / 0.01), rgb(var(--theme-accent-soft-rgb) / 0.24))",
              boxShadow: dark
                ? "0 10px 30px rgba(0,0,0,0.24)"
                : "0 12px 28px rgba(15,23,42,0.10)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              inset: archGlassInnerInset,
              transform: "rotate(180deg)",
              clipPath: STEP3_ARCH_CLIP_PATH,
              background: dark
                ? "linear-gradient(315deg, rgba(214,220,230,0.004), rgba(248,250,252,0.00075))"
                : "linear-gradient(315deg, rgb(var(--theme-accent-soft-rgb) / 0.12), rgb(var(--theme-accent-soft-rgb) / 0.08))",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              inset: archGlassInnerInset,
              transform: "rotate(180deg)",
              clipPath: STEP3_ARCH_CLIP_PATH,
              backdropFilter: "blur(1px)",
              WebkitBackdropFilter: "blur(1px)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              inset: archGlassInnerInset,
              transform: "rotate(180deg)",
              clipPath: STEP3_ARCH_CLIP_PATH,
              background: dark
                ? "linear-gradient(315deg, rgba(214,220,230,0.005) 0%, rgba(248,250,252,0.00075) 42%, transparent 100%)"
                : "linear-gradient(315deg, rgb(var(--theme-accent-soft-rgb) / 0.16) 0%, rgb(var(--theme-accent-soft-rgb) / 0.08) 42%, transparent 100%)",
              opacity: dark ? 0.04 : 0.78,
            }}
          />
          <div className="relative px-5 pb-20" style={{ paddingTop: "96px" }}>

            {/* Payment Methods */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <span style={{ color: "var(--c-tx1)", fontSize: "16px", fontWeight: 600, lineHeight: "20px" }}>
                  Payment Methods
                </span>
                <SectionButton dark={dark} onClick={() => router.push(`${routePrefix}/step-4`)}>
                  <Plus className="size-[14px]" strokeWidth={2} />
                  Add new
                </SectionButton>
              </div>

              <div className="flex items-start justify-between overflow-hidden rounded-[12px]">
                {([...PAYMENT_METHODS, PAYMENT_METHODS[0]] as typeof PAYMENT_METHODS[number][]).slice(0, 3).map((card, i) => (
                  <MiniCard
                    key={i}
                    dark={dark}
                    brand={card.brand}
                    last4={card.last4}
                  />
                ))}
              </div>
            </motion.div>

            {/* Divider */}
            <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
              <div
                className="my-6 h-px w-full"
                style={{ background: "var(--c-divider)" }}
              />
            </motion.div>

            {/* Shipping */}
            <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <span style={{ color: "var(--c-tx1)", fontSize: "16px", fontWeight: 600, lineHeight: "20px" }}>
                  Shipping
                </span>
                <SectionButton dark={dark} onClick={() => router.push(`${routePrefix}/step-2`)}>
                  {dark ? "Change" : "Edit Address"}
                </SectionButton>
              </div>

              <LocationCard dark={dark} />
            </motion.div>

          </div>
        </motion.div>
      </div>

      {/* ── Order Summary + edit button (outside arch card) ── */}
      <div className="px-5 pb-[220px]">
        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="mt-6">
          <OrderSummaryCard dark={dark} />
        </motion.div>

      </div>

      {/* ── Bottom CTA ───────────────────────────── */}
      <FooterCta
        label="Place Order   $206"
        onClick={() => router.push(`${routePrefix}/step-4`)}
      />

      {/* Swipe indicator */}
      <div
        className="fixed bottom-2 left-1/2 z-50 h-1 w-9 -translate-x-1/2 rounded-full"
        style={{ background: "rgb(var(--theme-accent-soft-rgb) / 0.5)" }}
      />
    </div>
  )
}
