"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, Heart, ShieldCheck } from "lucide-react"
import { useRouter } from "next/navigation"

import { StatusBar } from "@/components/checkout/status-bar"
import { PlanSelector } from "@/components/checkout/plan-selector"
import { ChipSelector } from "@/components/checkout/chip-selector"
import { SectionDivider } from "@/components/checkout/section-divider"
import { DoctorCard } from "@/components/checkout/doctor-card"
import { SpecsTable } from "@/components/checkout/specs-table"
import { Divider } from "@/components/checkout/divider"
import { BottomBar } from "@/components/checkout/bottom-bar"
import { PLANS, DOSAGE_OPTIONS, STRENGTH_OPTIONS, SPECS, DOCTOR } from "@/lib/tokens"

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.06, ease: EASE },
  }),
}

export default function Step1DarkPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState("starter")
  const [selectedDosage, setSelectedDosage] = useState("1-4 weeks")
  const [selectedStrength, setSelectedStrength] = useState("0.25mg")
  const [quantity, setQuantity] = useState(1)
  const [wishlisted, setWishlisted] = useState(false)

  const activePlan = PLANS.find((p) => p.id === selectedPlan) ?? PLANS[0]

  return (
    <div className="dark relative min-h-screen font-sans bg-page">

      {/* ── Fixed header ──── */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-50 pointer-events-none">
        <div
          className="pointer-events-auto"
          style={{
            background: "var(--c-header-blur)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
          }}
        >
          <StatusBar />
        </div>
        <div className="flex items-center justify-between px-4 pointer-events-auto">
          <motion.button
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => router.back()}
            className="size-12 rounded-full glass-rim flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
          >
            <ChevronLeft className="size-5" style={{ color: "var(--c-tx1)" }} strokeWidth={2} />
          </motion.button>
          <motion.button
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setWishlisted((v) => !v)}
            className="size-12 rounded-full glass-rim flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
          >
            <Heart
              className={["size-5 transition-colors", wishlisted ? "fill-rose-500 text-rose-500" : ""].join(" ")}
              style={wishlisted ? {} : { color: "var(--c-tx1)" }}
              strokeWidth={2}
            />
          </motion.button>
        </div>
      </div>

      {/* ── Hero image ───────────── */}
      <div
        className="relative w-full -mt-[25px]"
        style={{ aspectRatio: "9/7", isolation: "isolate", zIndex: 1 }}
      >
        <motion.img
          src="/semaglutide.png"
          alt="Semaglutide vial and syringe"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>

      {/* ── Main glass card ───────────────────────────── */}
      <div className="relative mx-3 -mt-20 z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative"
          style={{ clipPath: "path('M 183,0 C 233,0 273,22 273,48 L 338,48 Q 366,48 366,76 L 366,4000 Q 366,4028 338,4028 L 28,4028 Q 0,4028 0,4000 L 0,76 Q 0,48 28,48 L 93,48 C 93,22 133,0 183,0 Z')" }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "var(--glass-liquid-bg)",
              backdropFilter: "blur(var(--glass-liquid-blur))",
              WebkitBackdropFilter: "blur(var(--glass-liquid-blur))",
              boxShadow: "var(--glass-liquid-shadow)",
            }}
          />
          <div className="relative px-5 pb-40 space-y-6" style={{ paddingTop: "64px" }}>

            <div className="flex justify-center mb-1">
              <div className="w-9 h-1 rounded-full" style={{ background: "rgba(196,181,253,0.5)" }} />
            </div>

            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="flex justify-center">
              <span
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full glass-rim"
                style={{ background: "var(--c-cell-bg)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", color: "var(--c-tx2)" }}
              >
                GLP-1 · Weight Management
              </span>
            </motion.div>

            <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col items-center gap-2">
              <h1 className="text-center w-full" style={{ fontSize: "28px", fontWeight: 700, lineHeight: "34px", color: "var(--c-tx1)" }}>
                Semaglutide
              </h1>
              <p className="text-center" style={{ fontSize: "14px", fontWeight: 500, lineHeight: "20px", color: "var(--c-tx2)" }}>
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
                    <span style={{ fontSize: "14px", fontWeight: 600, lineHeight: "20px", color: "var(--c-tx2)" }}>{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible">
              <PlanSelector plans={PLANS} selected={selectedPlan} onChange={setSelectedPlan} />
            </motion.div>

            <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible">
              <SectionDivider label="Custom" />
              <div className="space-y-3 pt-1">
                <ChipSelector label="Dosage:" options={DOSAGE_OPTIONS} selected={selectedDosage} onChange={setSelectedDosage} />
                <ChipSelector label="Strength:" options={STRENGTH_OPTIONS} selected={selectedStrength} onChange={setSelectedStrength} />
              </div>
            </motion.div>

            <motion.div custom={6} variants={fadeUp} initial="hidden" animate="visible">
              <Divider />
            </motion.div>

            <motion.div custom={7} variants={fadeUp} initial="hidden" animate="visible">
              <h2 className="text-h6 mb-2" style={{ color: "var(--c-tx1)" }}>Description</h2>
              <p className="text-xs leading-4" style={{ color: "var(--c-tx2)" }}>
                A once-weekly GLP-1 receptor agonist prescribed for chronic weight management.
                Clinically proven to reduce body weight by up to 15% when combined with diet and exercise.
              </p>
            </motion.div>

            <motion.div custom={8} variants={fadeUp} initial="hidden" animate="visible">
              <h2 className="text-h6 mb-2" style={{ color: "var(--c-tx1)" }}>Your Doctor</h2>
              <DoctorCard name={DOCTOR.name} specialty={DOCTOR.specialty} />
            </motion.div>

            <motion.div custom={9} variants={fadeUp} initial="hidden" animate="visible">
              <Divider />
            </motion.div>

            <motion.div custom={10} variants={fadeUp} initial="hidden" animate="visible">
              <SpecsTable specs={SPECS} />
            </motion.div>

          </div>
        </motion.div>
      </div>

      <BottomBar
        price={activePlan.price}
        quantity={quantity}
        onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
        onIncrement={() => setQuantity((q) => q + 1)}
        onAddToCart={() => router.push("/checkout-dark/step-2")}
      />
    </div>
  )
}
