"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ShieldCheck, Sun, Moon } from "lucide-react"
import { useRouter } from "next/navigation"

import { StatusBar } from "@/components/checkout/status-bar"
import { PlanSelector } from "@/components/checkout/plan-selector"
import { ChipSelector } from "@/components/checkout/chip-selector"
import { SectionDivider } from "@/components/checkout/section-divider"
import { DoctorCard } from "@/components/checkout/doctor-card"
import { SpecsTable } from "@/components/checkout/specs-table"
import { Divider } from "@/components/checkout/divider"
import { BottomBar } from "@/components/checkout/bottom-bar"
import { useHeaderScrolled } from "@/components/checkout/use-header-scrolled"
import { PLANS, DOSAGE_OPTIONS, STRENGTH_OPTIONS, SPECS, DOCTOR } from "@/lib/tokens"

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]
const STEP3_ARCH_CLIP_PATH =
  "path('M 183,0 C 220,0 250,12 250,28 L 324,28 Q 366,28 366,76 L 366,4000 Q 366,4028 338,4028 L 28,4028 Q 0,4028 0,4000 L 0,76 Q 0,28 42,28 L 116,28 C 116,12 146,0 183,0 Z')"

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.06, ease: EASE },
  }),
}

function getCustomPrice(duration: string, strength: string) {
  if (duration === "1-4 weeks" && strength === "0.25mg") return 199
  if (duration === "1-4 weeks" && strength === "0.5mg") return 219
  if (duration === "1-4 weeks" && strength === "1mg") return 249
  if (duration === "5-8 weeks" && strength === "0.25mg") return 209
  if (duration === "5-8 weeks" && strength === "0.5mg") return 229
  if (duration === "5-8 weeks" && strength === "1mg") return 259
  if (duration === "9+ weeks" && strength === "0.25mg") return 229
  if (duration === "9+ weeks" && strength === "0.5mg") return 249
  return 279
}

export default function Step1Page() {
  const router = useRouter()
  const [selectedDosage, setSelectedDosage] = useState("1-4 weeks")
  const [selectedStrength, setSelectedStrength] = useState("0.25mg")
  const [quantity, setQuantity] = useState(1)
  const [isDark, setIsDark] = useState(false)
  const headerScrolled = useHeaderScrolled()
  const archGlassInset = "0px"
  const archGlassInnerInset = "2px"
  const selectedPlan = PLANS.find(
    (plan) =>
      plan.duration === selectedDosage &&
      plan.dose.replace(/\s+/g, "") === selectedStrength
  )
  const currentPrice = selectedPlan?.price ?? getCustomPrice(selectedDosage, selectedStrength)

  return (
    <div className={["relative min-h-screen font-sans bg-page", isDark ? "dark" : ""].join(" ")}>

      {/* ── Fixed header: Status bar + nav controls ──── */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-50 pointer-events-none">
        {/* Status bar row — frosted glass so content stays legible on scroll */}
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

        {/* Controllers row */}
        <div
          className="pointer-events-auto px-4 transition-all duration-200"
          style={{
            background: headerScrolled ? "var(--c-header-blur)" : "transparent",
            backdropFilter: headerScrolled ? "blur(5px)" : "none",
            WebkitBackdropFilter: headerScrolled ? "blur(5px)" : "none",
            WebkitMaskImage: headerScrolled ? "linear-gradient(to bottom, black 0%, black 62%, transparent 100%)" : "none",
            maskImage: headerScrolled ? "linear-gradient(to bottom, black 0%, black 62%, transparent 100%)" : "none",
          }}
        >
          <div className="flex items-center justify-between">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => router.back()}
            className="size-12 rounded-full glass-rim flex items-center justify-center"
            style={{
              background: "rgba(255, 255, 255, 0.10)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            <ChevronLeft className="size-5" style={{ color: "var(--c-tx1)" }} strokeWidth={2} />
          </motion.button>

          <div className="size-12" />

          {/* Theme toggle */}
          <motion.button
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsDark((v) => !v)}
            className="size-12 rounded-full glass-rim flex items-center justify-center"
            style={{
              background: "rgba(255, 255, 255, 0.10)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            {isDark
              ? <Sun className="size-5" style={{ color: "var(--c-tx1)" }} strokeWidth={2} />
              : <Moon className="size-5" style={{ color: "var(--c-tx1)" }} strokeWidth={2} />
            }
          </motion.button>
          </div>
        </div>
      </div>

      {/* ── Hero: full-width product image ───────────── */}
      <div className="relative w-full -mt-[25px]" style={{ aspectRatio: "9/7" }}>
        <motion.img
          src="/semaglutide.png"
          alt="Semaglutide vial and syringe"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark mode image overlay — fades top-to-bottom from dark navy */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--c-image-overlay)" }}
        />
      </div>

      {/* ── Main glass card ───────────────────────────── */}
      <div className="relative mx-3 -mt-20 z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative"
        >
          <div
            className="absolute inset-0"
            style={{
              inset: archGlassInset,
              clipPath: STEP3_ARCH_CLIP_PATH,
              background: isDark
                ? "linear-gradient(135deg, rgba(255,255,255,0.015) 0%, rgba(255,255,255,0.08) 22%, rgba(255,255,255,0.05) 56%, rgba(255,255,255,0.025) 100%)"
                : "linear-gradient(135deg, rgba(196,181,253,0.01), rgba(196,181,253,0.24))",
              boxShadow: isDark
                ? "0 10px 30px rgba(0,0,0,0.24)"
                : "0 12px 28px rgba(15,23,42,0.10)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              inset: archGlassInnerInset,
              clipPath: STEP3_ARCH_CLIP_PATH,
              background: isDark
                ? "linear-gradient(135deg, rgba(214,220,230,0.004), rgba(248,250,252,0.00075))"
                : "linear-gradient(135deg, rgba(196,181,253,0.12), rgba(196,181,253,0.08))",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              inset: archGlassInnerInset,
              clipPath: STEP3_ARCH_CLIP_PATH,
              backdropFilter: "blur(1px)",
              WebkitBackdropFilter: "blur(1px)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              inset: archGlassInnerInset,
              clipPath: STEP3_ARCH_CLIP_PATH,
              background: isDark
                ? "linear-gradient(135deg, rgba(214,220,230,0.005) 0%, rgba(248,250,252,0.00075) 42%, transparent 100%)"
                : "linear-gradient(135deg, rgba(196,181,253,0.16) 0%, rgba(196,181,253,0.08) 42%, transparent 100%)",
              opacity: isDark ? 0.04 : 0.78,
            }}
          />

          {/* Content */}
          <div className="relative px-5 pb-40 space-y-4" style={{ paddingTop: "64px" }}>

            {/* Pill indicator */}
            <div className="flex justify-center mb-1">
              <div className="w-9 h-1 rounded-full" style={{ background: "rgba(196, 181, 253, 0.5)" }} />
            </div>

            {/* Category badge */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="flex justify-center">
              <span
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full glass-rim"
                style={{
                  background: "var(--c-cell-bg)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  color: "var(--c-tx2)",
                }}
              >
                GLP-1 · Weight Management
              </span>
            </motion.div>

            {/* Basic Info */}
            <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col items-center gap-2">
              <h1
                className="text-center w-full"
                style={{ fontSize: "28px", fontWeight: 700, lineHeight: "34px", color: "var(--c-tx1)" }}
              >
                Semaglutide
              </h1>
              <p
                className="text-center"
                style={{ fontSize: "14px", fontWeight: 500, lineHeight: "20px", color: "var(--c-tx2)" }}
              >
                Your doctor has prescribed this medication.{" "}
                Select the plan that fits your treatment phase.
              </p>
              <div className="flex items-center gap-5">
                {[
                  { icon: <ShieldCheck className="size-[18px] text-brand" strokeWidth={2} />, label: "HIPAA secure" },
                  { icon: <ShieldCheck className="size-[18px] text-brand" strokeWidth={2} />, label: "FDA Approved" },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    {icon}
                    <span style={{ fontSize: "14px", fontWeight: 600, lineHeight: "20px", color: "var(--c-tx2)" }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Plan selector */}
            <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible">
              <PlanSelector
                plans={PLANS}
                selected={selectedPlan?.id ?? null}
                onChange={(planId) => {
                  const plan = PLANS.find((p) => p.id === planId)
                  if (!plan) return
                  setSelectedDosage(plan.duration)
                  setSelectedStrength(plan.dose.replace(/\s+/g, ""))
                }}
                useGlassCheckbox
              />
            </motion.div>

            {/* Custom section */}
            <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible">
              <SectionDivider label="Custom" />
              <div className="space-y-3 pt-1">
                <ChipSelector label="Dosage:" options={DOSAGE_OPTIONS} selected={selectedDosage} onChange={setSelectedDosage} />
                <ChipSelector label="Strength:" options={STRENGTH_OPTIONS} selected={selectedStrength} onChange={setSelectedStrength} />
              </div>
            </motion.div>

            {/* Divider */}
            <motion.div custom={6} variants={fadeUp} initial="hidden" animate="visible">
              <Divider />
            </motion.div>

            {/* Description */}
            <motion.div custom={7} variants={fadeUp} initial="hidden" animate="visible">
              <h2 className="text-h6 mb-2" style={{ color: "var(--c-tx1)" }}>Description</h2>
              <p className="text-xs leading-4" style={{ color: "var(--c-tx2)" }}>
                A once-weekly GLP-1 receptor agonist prescribed for chronic weight management.
                Clinically proven to reduce body weight by up to 15% when combined with diet and exercise.
              </p>
            </motion.div>

            {/* Doctor */}
            <motion.div custom={8} variants={fadeUp} initial="hidden" animate="visible">
              <h2 className="text-h6 mb-2" style={{ color: "var(--c-tx1)" }}>Your Doctor</h2>
              <DoctorCard dark={isDark} name={DOCTOR.name} specialty={DOCTOR.specialty} />
            </motion.div>

            {/* Divider */}
            <motion.div custom={9} variants={fadeUp} initial="hidden" animate="visible">
              <Divider />
            </motion.div>

            {/* Specs */}
            <motion.div custom={10} variants={fadeUp} initial="hidden" animate="visible">
              <SpecsTable specs={SPECS} />
            </motion.div>

          </div>{/* end content */}
        </motion.div>{/* end clip container */}
      </div>{/* end card wrapper */}

      {/* ── Sticky bottom action bar ─────────────────── */}
      <BottomBar
        price={currentPrice}
        quantity={quantity}
        onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
        onIncrement={() => setQuantity((q) => q + 1)}
        onAddToCart={() => router.push("/checkout/step-2")}
      />
    </div>
  )
}
