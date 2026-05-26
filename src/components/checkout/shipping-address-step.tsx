"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, Moon, Plus, Sun, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"

import { StatusBar } from "@/components/checkout/status-bar"
import { useHeaderScrolled } from "@/components/checkout/use-header-scrolled"
import { FooterCta } from "@/components/checkout/footer-cta"
import {
  CurrentLocationCard,
  FormFieldRHF,
  PriceSummaryRow,
  SavedAddressItem,
  SectionTitleRow,
} from "@/components/checkout/checkout-primitives"
import { ARCH_CLIP_PATH, EASE, fadeUp } from "@/lib/checkout"

const addressSchema = z.object({
  address1: z.string().min(1, "Address is required"),
  address2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  zip: z
    .string()
    .min(1, "ZIP is required")
    .regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code"),
})
type AddressFormValues = z.infer<typeof addressSchema>

const SAVED_ADDRESSES = [
  {
    id: "1",
    label: "Home",
    address: "Empire State Building 20 W 34th St,",
    cityState: "New York, NY  -  United States",
  },
  {
    id: "2",
    label: "Home",
    address: "Empire State Building 20 W 34th St,",
    cityState: "New York, NY  -  United States",
  },
]

interface ShippingAddressStepProps {
  dark?: boolean
  onToggleTheme?: () => void
  routePrefix: string
  useStep3Glass?: boolean
}

export function ShippingAddressStep({
  dark = false,
  onToggleTheme,
  routePrefix,
  useStep3Glass = false,
}: ShippingAddressStepProps) {
  const router = useRouter()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const headerScrolled = useHeaderScrolled()
  const archGlassInset = "0px"
  const archGlassInnerInset = "2px"

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
  })

  const onSubmit = (data: AddressFormValues) => {
    console.log("New address saved:", data)
    setShowForm(false)
    reset()
  }

  return (
    <div className={["relative min-h-screen font-sans bg-page", dark ? "dark" : ""].join(" ")}>

      {/* ── Fixed header ─────────────────────────────────────────────── */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-50 pointer-events-none">
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
          {/* Back */}
          <motion.button
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => router.push(`${routePrefix}/step-1`)}
            className="size-12 rounded-full glass-rim flex items-center justify-center"
            style={{
              background: "rgba(255, 255, 255, 0.10)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            <ChevronLeft className="size-5" style={{ color: "var(--c-tx1)" }} strokeWidth={2} />
          </motion.button>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            style={{
              color: "var(--c-tx1)",
              fontSize: "28px",
              fontWeight: 700,
              lineHeight: "34px",
            }}
          >
            Address
          </motion.h1>

          {/* Theme toggle — only rendered when caller provides handler */}
          {onToggleTheme ? (
            <motion.button
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              whileTap={{ scale: 0.96 }}
              onClick={onToggleTheme}
              className="size-12 rounded-full glass-rim flex items-center justify-center"
              style={{
                background: "rgba(255, 255, 255, 0.10)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              {dark
                ? <Sun className="size-5" style={{ color: "var(--c-tx1)" }} strokeWidth={2} />
                : <Moon className="size-5" style={{ color: "var(--c-tx1)" }} strokeWidth={2} />
              }
            </motion.button>
          ) : (
            <div className="size-12" />
          )}
          </div>
        </div>
      </div>

      {/* ── Main arch card ─────────────────────────────────────────── */}
      <div className="relative mx-3 z-10 mt-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative"
        >
          {/* Glass liquid background — shape only, rotated 180° so arch faces down */}
          <div
            className="absolute inset-0"
            style={{
              inset: useStep3Glass ? archGlassInset : undefined,
              transform: "rotate(180deg)",
              clipPath: useStep3Glass
                ? "path('M 183,0 C 220,0 250,12 250,28 L 324,28 Q 366,28 366,76 L 366,4000 Q 366,4028 338,4028 L 28,4028 Q 0,4028 0,4000 L 0,76 Q 0,28 42,28 L 116,28 C 116,12 146,0 183,0 Z')"
                : ARCH_CLIP_PATH,
              background: useStep3Glass
                ? dark
                  ? "linear-gradient(315deg, rgba(255,255,255,0.015) 0%, rgba(255,255,255,0.08) 22%, rgba(255,255,255,0.05) 56%, rgba(255,255,255,0.025) 100%)"
                  : "linear-gradient(315deg, rgb(var(--theme-accent-soft-rgb) / 0.01), rgb(var(--theme-accent-soft-rgb) / 0.24))"
                : "var(--glass-liquid-bg)",
              boxShadow: useStep3Glass
                ? dark
                  ? "0 10px 30px rgba(0,0,0,0.24)"
                  : "0 12px 28px rgba(15,23,42,0.10)"
                : "var(--glass-liquid-shadow)",
            }}
          />
          {useStep3Glass ? (
            <>
              <div
                className="absolute inset-0"
                style={{
                  inset: archGlassInnerInset,
                  transform: "rotate(180deg)",
                  clipPath: "path('M 183,0 C 220,0 250,12 250,28 L 324,28 Q 366,28 366,76 L 366,4000 Q 366,4028 338,4028 L 28,4028 Q 0,4028 0,4000 L 0,76 Q 0,28 42,28 L 116,28 C 116,12 146,0 183,0 Z')",
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
                  clipPath: "path('M 183,0 C 220,0 250,12 250,28 L 324,28 Q 366,28 366,76 L 366,4000 Q 366,4028 338,4028 L 28,4028 Q 0,4028 0,4000 L 0,76 Q 0,28 42,28 L 116,28 C 116,12 146,0 183,0 Z')",
                  backdropFilter: "blur(1px)",
                  WebkitBackdropFilter: "blur(1px)",
                }}
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  inset: archGlassInnerInset,
                  transform: "rotate(180deg)",
                  clipPath: "path('M 183,0 C 220,0 250,12 250,28 L 324,28 Q 366,28 366,76 L 366,4000 Q 366,4028 338,4028 L 28,4028 Q 0,4028 0,4000 L 0,76 Q 0,28 42,28 L 116,28 C 116,12 146,0 183,0 Z')",
                  background: dark
                    ? "linear-gradient(315deg, rgba(214,220,230,0.005) 0%, rgba(248,250,252,0.00075) 42%, transparent 100%)"
                    : "linear-gradient(315deg, rgb(var(--theme-accent-soft-rgb) / 0.16) 0%, rgb(var(--theme-accent-soft-rgb) / 0.08) 42%, transparent 100%)",
                  opacity: dark ? 0.04 : 0.78,
                }}
              />
            </>
          ) : null}

          <div className="relative px-5 pb-16" style={{ paddingTop: "96px" }}>

              {/* Current location banner — hides when add-address form is open */}
              <AnimatePresence initial={false}>
                {!showForm && (
                  <motion.div
                    key="current-location-block"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    style={{ overflow: "hidden" }}
                  >
                    <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
                      <CurrentLocationCard
                        address="555 Madison Avenue,"
                        cityState="New York, NY  -  United States"
                        dark={dark}
                        variant={useStep3Glass ? "step3Glass" : "default"}
                      />
                    </motion.div>

                    <motion.div
                      custom={1}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      style={{ height: "1px", background: "var(--c-divider)", margin: "24px 0" }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Saved Addresses header */}
              <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
                <SectionTitleRow
                  title="Saved Addresses"
                  actionLabel="Add new"
                  actionIcon={<Plus className="size-3.5" strokeWidth={2.5} />}
                  onAction={() => setShowForm((s) => !s)}
                />
              </motion.div>

              {/* Address list */}
              <div className="mt-4 space-y-3">
                {SAVED_ADDRESSES.map((addr, i) => (
                  <motion.div
                    key={addr.id}
                    custom={3 + i}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                  >
                    <SavedAddressItem
                      label={addr.label}
                      address={addr.address}
                      dark={dark}
                      cityState={addr.cityState}
                      selected={selectedId === addr.id}
                      onClick={() => setSelectedId(selectedId === addr.id ? null : addr.id)}
                      onMenu={() => {}}
                      variant={useStep3Glass ? "step3Glass" : "default"}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Inline add-address form */}
              <AnimatePresence>
                {showForm && (
                  <motion.div
                    key="address-form"
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    style={{ overflow: "hidden" }}
                  >
                    <div
                      className="glass-rim rounded-2xl p-4"
                      style={{
                        background: "var(--c-cell-bg)",
                        boxShadow: "var(--c-unsel-shadow)",
                      }}
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <span
                          style={{
                            color: "var(--c-tx1)",
                            fontSize: "15px",
                            fontWeight: 700,
                            lineHeight: "20px",
                          }}
                        >
                          New Address
                        </span>
                        <button
                          type="button"
                          onClick={() => { setShowForm(false); reset() }}
                          className="flex size-7 items-center justify-center rounded-full"
                          style={{ background: "var(--c-checkbox-bg)" }}
                        >
                          <X className="size-3.5" style={{ color: "var(--c-tx2)" }} strokeWidth={2.5} />
                        </button>
                      </div>

                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
                        <FormFieldRHF
                          label="Address 1"
                          placeholder="123 Main Street"
                          error={errors.address1?.message}
                          {...register("address1")}
                        />
                        <FormFieldRHF
                          label="Address 2 (optional)"
                          placeholder="Apt, Suite, Floor..."
                          error={errors.address2?.message}
                          {...register("address2")}
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <FormFieldRHF
                            label="City"
                            placeholder="New York"
                            error={errors.city?.message}
                            {...register("city")}
                          />
                          <FormFieldRHF
                            label="State"
                            placeholder="NY"
                            error={errors.state?.message}
                            {...register("state")}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <FormFieldRHF
                            label="Country"
                            placeholder="United States"
                            error={errors.country?.message}
                            {...register("country")}
                          />
                          <FormFieldRHF
                            label="ZIP Code"
                            placeholder="10001"
                            error={errors.zip?.message}
                            {...register("zip")}
                          />
                        </div>

                        <motion.button
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="glass-rim mt-1 w-full rounded-xl py-3"
                          style={{
                            background: "var(--brand-primary)",
                            color: "#FFFFFF",
                            fontSize: "14px",
                            fontWeight: 700,
                            lineHeight: "20px",
                          }}
                        >
                          Save Address
                        </motion.button>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
        </motion.div>
      </div>

      {/* ── Price summary (plain background below the arch card) ─── */}
      <div className="px-5 mt-6 space-y-4 pb-40">
        <motion.div custom={6} variants={fadeUp} initial="hidden" animate="visible">
          <PriceSummaryRow label="Subtotal:" value="$199" dark={dark} variant={useStep3Glass ? "step3Glass" : "default"} />
        </motion.div>
        <motion.div custom={7} variants={fadeUp} initial="hidden" animate="visible">
          <PriceSummaryRow label="Shipping:" value="$7" dark={dark} variant={useStep3Glass ? "step3Glass" : "default"} />
        </motion.div>
        <motion.div
          custom={8}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{ height: "1px", background: "var(--c-divider)" }}
        />
        <motion.div custom={9} variants={fadeUp} initial="hidden" animate="visible">
          <PriceSummaryRow label="Total Cost:" value="$206" emphasized dark={dark} variant={useStep3Glass ? "step3Glass" : "default"} />
        </motion.div>
      </div>

      {/* ── Sticky bottom CTA — slides down when add-address form is open */}
      <FooterCta
        hidden={showForm}
        label="Continue to Payment   $206"
        onClick={() => router.push(`${routePrefix}/step-3`)}
      />
    </div>
  )
}
