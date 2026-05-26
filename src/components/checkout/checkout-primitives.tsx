"use client"
import React from "react"
import { Check, CreditCard, Home, MapPin, MoreVertical, Plus } from "lucide-react"

import { cn } from "@/lib/utils"

interface SectionTitleRowProps {
  actionIcon?: React.ReactNode
  actionLabel: string
  onAction: () => void
  title: string
}

export function SectionTitleRow({ actionIcon, actionLabel, onAction, title }: SectionTitleRowProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-h6" style={{ color: "var(--c-tx1)" }}>
        {title}
      </h2>

      <button
        onClick={onAction}
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
        {actionIcon}
        {actionLabel}
      </button>
    </div>
  )
}

function GlassSurface({
  dark,
  radius,
  padding,
  className = "",
  children,
}: {
  dark: boolean
  radius: number
  padding: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`.trim()}
      style={{
        borderRadius: `${radius}px`,
        padding,
        background: dark ? "rgba(255,255,255,0.015)" : "rgb(var(--theme-accent-soft-rgb) / 0.10)",
        border: dark ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgb(var(--theme-accent-soft-rgb) / 0.14)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        boxShadow: dark
          ? "0 6px 18px rgba(0,0,0,0.10)"
          : "0 8px 22px rgba(15,23,42,0.07), 0 2px 7px rgb(var(--theme-accent-soft-rgb) / 0.08)",
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

interface AddressCardProps {
  address: string
  cityStateZip: string
  label: string
  phone: string
  recipient: string
  selected: boolean
  onClick: () => void
}

export function AddressCard({
  address,
  cityStateZip,
  label,
  phone,
  recipient,
  selected,
  onClick,
}: AddressCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-start gap-4 rounded-xl px-4 py-4 text-left transition-shadow duration-200"
      style={{
        background: selected ? "var(--brand-primary)" : "var(--c-cell-bg)",
        boxShadow: selected ? "var(--c-sel-glow)" : "var(--c-unsel-shadow)",
      }}
    >
      <div
        className="glass-rim flex size-[30px] shrink-0 items-center justify-center rounded-[8px]"
        style={{
          background: selected ? "rgb(var(--theme-accent-pale-rgb) / 0.92)" : "var(--c-checkbox-bg)",
          boxShadow: selected ? "none" : "var(--c-checkbox-shadow)",
        }}
      >
        {selected ? <Check className="size-3.5 text-brand" strokeWidth={3} /> : <MapPin className="size-3.5" style={{ color: "var(--c-tx2)" }} strokeWidth={2.25} />}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-center gap-2">
          <span
            className="rounded-full px-2 py-0.5"
            style={{
              background: selected ? "rgba(255,255,255,0.18)" : "rgb(var(--theme-accent-rgb) / 0.14)",
              color: selected ? "#FFFFFF" : "var(--c-tx1)",
              fontSize: "11px",
              fontWeight: 700,
              lineHeight: "14px",
            }}
          >
            {label}
          </span>
          <span style={{ color: selected ? "#F5F3FF" : "var(--c-tx2)", fontSize: "12px", fontWeight: 500, lineHeight: "16px" }}>
            {phone}
          </span>
        </div>

        <p className="text-h6" style={{ color: selected ? "#FFFFFF" : "var(--c-tx1)" }}>
          {recipient}
        </p>
        <p className="mt-1 text-xs leading-4" style={{ color: selected ? "#EDE9FE" : "var(--c-tx2)" }}>
          {address}
        </p>
        <p className="mt-0.5 text-xs leading-4" style={{ color: selected ? "#EDE9FE" : "var(--c-tx2)" }}>
          {cityStateZip}
        </p>
      </div>
    </button>
  )
}

interface SummaryCardProps {
  items: readonly { label: string; value: string; emphasized?: boolean }[]
}

export function SummaryCard({ items }: SummaryCardProps) {
  return (
    <div
      className="glass-rim rounded-xl p-4"
      style={{
        background: "var(--c-cell-bg)",
        boxShadow: "var(--c-unsel-shadow)",
      }}
    >
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between gap-4">
            <span
              style={{
                color: item.emphasized ? "var(--c-tx1)" : "var(--c-tx2)",
                fontSize: item.emphasized ? "15px" : "13px",
                fontWeight: item.emphasized ? 700 : 500,
                lineHeight: item.emphasized ? "20px" : "18px",
              }}
            >
              {item.label}
            </span>
            <span
              style={{
                color: item.emphasized ? "var(--c-tx1)" : "var(--c-tx2)",
                fontSize: item.emphasized ? "18px" : "13px",
                fontWeight: item.emphasized ? 700 : 600,
                lineHeight: item.emphasized ? "24px" : "18px",
              }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

interface PaymentCardProps {
  accentFrom: string
  accentTo: string
  brand: string
  expiry: string
  holder: string
  last4: string
  selected?: boolean
}

export function PaymentCard({
  accentFrom,
  accentTo,
  brand,
  expiry,
  holder,
  last4,
  selected = false,
}: PaymentCardProps) {
  return (
    <div
      className={cn("rounded-[18px] p-5 transition-shadow duration-200", selected && "glass-rim")}
      style={{
        background: `linear-gradient(135deg, ${accentFrom} 0%, ${accentTo} 100%)`,
        boxShadow: selected ? "var(--c-sel-glow)" : "0 18px 32px rgba(8,14,26,0.18)",
      }}
    >
      <div className="mb-8 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#F5F3FF" }}>
          {brand}
        </span>
        <CreditCard className="size-5 text-white/90" strokeWidth={2} />
      </div>

      <p style={{ color: "#FFFFFF", fontSize: "21px", fontWeight: 700, lineHeight: "24px", letterSpacing: "0.08em" }}>
        •••• •••• •••• {last4}
      </p>

      <div className="mt-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/70">Card Holder</p>
          <p className="mt-1 text-sm font-semibold text-white">{holder}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/70">Expires</p>
          <p className="mt-1 text-sm font-semibold text-white">{expiry}</p>
        </div>
      </div>
    </div>
  )
}

interface FormFieldProps {
  className?: string
  label: string
  onChange: (value: string) => void
  placeholder: string
  value: string
}

export function FormField({ className, label, onChange, placeholder, value }: FormFieldProps) {
  return (
    <label className={cn("block", className)}>
      <span
        className="mb-1.5 block"
        style={{ color: "var(--c-tx2)", fontSize: "12px", fontWeight: 600, lineHeight: "16px" }}
      >
        {label}
      </span>
      <div
        className="glass-rim rounded-[8px] px-3 py-3"
        style={{
          background: "var(--c-cell-bg)",
          boxShadow: "var(--c-unsel-shadow)",
        }}
      >
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full border-none bg-transparent p-0 outline-none placeholder:opacity-70"
          style={{
            color: "var(--c-tx1)",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "20px",
          }}
        />
      </div>
    </label>
  )
}

interface MiniMapProps {
  onAdd: () => void
}

export function MiniMap({ onAdd }: MiniMapProps) {
  return (
    <div className="space-y-4">
      <div
        className="glass-rim relative overflow-hidden rounded-xl"
        style={{
          minHeight: "148px",
          background:
            "radial-gradient(circle at 22% 18%, rgba(255,255,255,0.55), transparent 24%), linear-gradient(135deg, rgb(var(--theme-accent-rgb) / 0.24), rgba(255,255,255,0.10) 58%, rgb(var(--theme-accent-glow-rgb) / 0.34))",
          boxShadow: "var(--c-unsel-shadow)",
        }}
      >
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="absolute left-[22%] top-[34%]">
          <MapPin className="size-6 text-brand drop-shadow-[0_6px_18px_rgba(139,92,246,0.35)]" fill="currentColor" strokeWidth={1.5} />
        </div>
        <div className="absolute right-[18%] top-[22%]">
          <MapPin className="size-5 text-white/85" fill="currentColor" strokeWidth={1.5} />
        </div>
        <div className="absolute bottom-[20%] right-[32%]">
          <MapPin className="size-5 text-white/75" fill="currentColor" strokeWidth={1.5} />
        </div>
      </div>

      <button
        onClick={onAdd}
        className="glass-rim flex w-full items-center justify-center gap-2 rounded-[10px] px-4 py-3"
        style={{
          background: "var(--c-cell-bg)",
          boxShadow: "var(--c-unsel-shadow)",
          color: "var(--c-tx1)",
        }}
      >
        <Plus className="size-4 text-brand" strokeWidth={2.5} />
        <span style={{ fontSize: "14px", fontWeight: 600, lineHeight: "18px" }}>Add a new delivery address</span>
      </button>
    </div>
  )
}

// ─── Shipping Address Step Components ──────────────────────────────────────

interface CurrentLocationCardProps {
  address: string
  cityState: string
  dark?: boolean
  variant?: "default" | "step3Glass"
}

export function CurrentLocationCard({ address, cityState, dark, variant = "default" }: CurrentLocationCardProps) {
  if (variant === "step3Glass") {
    return (
      <GlassSurface dark={dark ?? false} radius={12} padding="12px 24px" className="w-full">
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
                Current Location
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
                Active
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
              {address}
            </p>
            <p
              style={{
                color: dark ? "#ffffff" : "#9ca3af",
                fontSize: "12px",
                fontWeight: 400,
                lineHeight: "16px",
              }}
            >
              {cityState}
            </p>
          </div>
        </div>
      </GlassSurface>
    )
  }

  return (
    <div
      className="glass-rim flex items-center justify-between gap-4 rounded-2xl px-4 py-4"
      style={{
        background: dark ? "rgba(88, 28, 135, 0.38)" : "rgba(139, 92, 246, 0.80)",
        boxShadow: dark
          ? "0px 4px 20px rgba(88, 28, 135, 0.35)"
          : "0px 4px 20px rgba(139, 92, 246, 0.35)",
      }}
    >
      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex items-center gap-2">
          <span style={{ color: "#FFFFFF", fontSize: "15px", fontWeight: 700, lineHeight: "20px" }}>
            Current Location
          </span>
          <span
            className="rounded-full px-2 py-0.5"
            style={{
              background: "rgba(34, 197, 94, 0.22)",
              border: "0.5px solid rgba(74, 222, 128, 0.45)",
              color: "#4ADE80",
              fontSize: "11px",
              fontWeight: 700,
              lineHeight: "14px",
            }}
          >
            Active
          </span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.88)", fontSize: "13px", fontWeight: 400, lineHeight: "18px" }}>
          {address}
        </p>
        <p style={{ color: "rgba(255,255,255,0.88)", fontSize: "13px", fontWeight: 400, lineHeight: "18px" }}>
          {cityState}
        </p>
      </div>

      {/* Map thumbnail */}
      <div
        className="glass-rim relative shrink-0 overflow-hidden rounded-[12px]"
        style={{ width: 64, height: 64 }}
      >
        {/* Multi-color map base */}
        <div className="absolute inset-0" style={{ background: "#d4e9b8" }} />
        {/* Water / blue patch */}
        <div className="absolute" style={{ top: 0, left: 0, width: 28, height: 26, background: "#93c5fd" }} />
        {/* Beige / urban block */}
        <div className="absolute" style={{ top: 14, right: 0, width: 26, height: 22, background: "#fde68a" }} />
        {/* Park / green block */}
        <div className="absolute" style={{ bottom: 0, left: 0, width: 24, height: 20, background: "#86efac" }} />
        {/* Road grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.75) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.75) 2px, transparent 2px)",
            backgroundSize: "16px 16px",
          }}
        />
        {/* Purple home icon box */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="flex items-center justify-center rounded-[10px]"
            style={{
              width: 30,
              height: 30,
              background: "var(--brand-primary)",
              boxShadow: "0 2px 8px rgb(var(--theme-accent-rgb) / 0.45)",
            }}
          >
            <Home className="size-[15px] text-white" strokeWidth={1.8} />
          </div>
        </div>
      </div>
    </div>
  )
}

interface SavedAddressItemProps {
  address: string
  dark?: boolean
  cityState: string
  label: string
  onClick: () => void
  onMenu: (e: React.MouseEvent) => void
  selected: boolean
  variant?: "default" | "step3Glass"
}

export function SavedAddressItem({
  address,
  dark = false,
  cityState,
  label,
  onClick,
  onMenu,
  selected,
  variant = "default",
}: SavedAddressItemProps) {
  const useStep3Glass = variant === "step3Glass"

  if (useStep3Glass) {
    return (
      <div className="w-full cursor-pointer" onClick={onClick}>
        <GlassSurface dark={dark} radius={12} padding="14px 16px" className="w-full">
          <div className="flex items-center gap-3">
            <div
              className="glass-rim shrink-0 rounded-[8px] flex items-center justify-center"
              style={{
                width: 30,
                height: 30,
                background: selected ? "rgb(var(--theme-accent-pale-rgb) / 0.92)" : dark ? "rgba(255,255,255,0.08)" : "rgb(var(--theme-accent-soft-rgb) / 0.08)",
                boxShadow: selected ? "none" : "0 2px 8px rgb(var(--theme-accent-rgb) / 0.18)",
                border: dark ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgb(var(--theme-accent-soft-rgb) / 0.16)",
              }}
            >
              {selected && <Check className="size-3.5 text-brand" strokeWidth={3} />}
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="rounded-full px-2 py-0.5" style={{ background: "rgb(var(--theme-accent-pale-rgb) / 0.95)", color: "var(--brand-primary)", fontSize: "11px", fontWeight: 700, lineHeight: "14px" }}>
                  {label}
                </span>
              </div>
              <p className="text-h6" style={{ color: dark ? "#ffffff" : "#080e1a" }}>
                {label}
              </p>
              <p className="mt-1 text-xs leading-4" style={{ color: dark ? "#ffffff" : "#9ca3af" }}>
                {address}
              </p>
              <p className="mt-0.5 text-xs leading-4" style={{ color: dark ? "#ffffff" : "#9ca3af" }}>
                {cityState}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation()
                onMenu(e)
              }}
              className="shrink-0 p-1"
            >
              <MoreVertical className="size-4" style={{ color: dark ? "rgba(255,255,255,0.72)" : "#9ca3af" }} strokeWidth={2} />
            </button>
          </div>
        </GlassSurface>
      </div>
    )
  }

  return (
    <div
      className="flex w-full items-center gap-3 rounded-2xl px-4 py-4 transition-shadow duration-200"
      style={{
        background: selected ? "var(--brand-primary)" : "var(--c-cell-bg)",
        boxShadow: selected ? "var(--c-sel-glow)" : "var(--c-unsel-shadow)",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {/* Checkbox square */}
      <div
        className="glass-rim shrink-0 rounded-[8px] flex items-center justify-center"
        style={{
          width: 30,
          height: 30,
          background: selected ? "rgb(var(--theme-accent-pale-rgb) / 0.92)" : "var(--c-checkbox-bg)",
          boxShadow: selected ? "none" : "var(--c-checkbox-shadow)",
          border: selected ? "none" : "1.5px solid rgb(var(--theme-accent-soft-rgb) / 0.35)",
        }}
      >
        {selected && <Check className="size-3.5 text-brand" strokeWidth={3} />}
      </div>

      {/* Text content */}
      <div className="min-w-0 flex-1">
        <p className="text-h6" style={{ color: selected ? "#FFFFFF" : "var(--c-tx1)" }}>
          {label}
        </p>
        <p
          style={{
            color: selected ? "#EDE9FE" : "var(--c-tx2)",
            fontSize: "11px",
            lineHeight: "15px",
            marginTop: "2px",
          }}
        >
          {address}
        </p>
        <p style={{ color: selected ? "#EDE9FE" : "var(--c-tx2)", fontSize: "11px", lineHeight: "15px" }}>
          {cityState}
        </p>
      </div>

      {/* Three-dot menu */}
      <button
        onClick={(e) => { e.stopPropagation(); onMenu(e) }}
        className="shrink-0 p-1"
      >
        <MoreVertical
          className="size-4"
          style={{ color: selected ? "rgba(237,233,254,0.7)" : "var(--c-tx2)" }}
          strokeWidth={2}
        />
      </button>
    </div>
  )
}

interface PriceSummaryRowProps {
  emphasized?: boolean
  label: string
  value: string
  dark?: boolean
  variant?: "default" | "step3Glass"
}

export function PriceSummaryRow({ emphasized, label, value, dark = false, variant = "default" }: PriceSummaryRowProps) {
  if (variant === "step3Glass") {
    return (
      <div className="flex items-center justify-between gap-3">
        <span
          style={{
            color: dark ? "#ffffff" : "var(--c-tx1)",
            fontSize: emphasized ? "17px" : "15px",
            fontWeight: emphasized ? 700 : 500,
            lineHeight: emphasized ? "22px" : "20px",
          }}
        >
          {label}
        </span>
        <GlassSurface dark={dark} radius={10} padding="6px 12px" className="shrink-0">
          <span
            style={{
              color: dark ? "#ffffff" : "#080e1a",
              fontSize: emphasized ? "20px" : "15px",
              fontWeight: 700,
              lineHeight: emphasized ? "26px" : "20px",
            }}
          >
            {value}
          </span>
        </GlassSurface>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between gap-3">
      <span
        style={{
          color: "var(--c-tx1)",
          fontSize: emphasized ? "17px" : "15px",
          fontWeight: emphasized ? 700 : 500,
          lineHeight: emphasized ? "22px" : "20px",
        }}
      >
        {label}
      </span>
      <div
        className="glass-rim rounded-[8px] px-3 py-1.5"
        style={{
          background: "var(--c-cell-bg)",
          boxShadow: "var(--c-unsel-shadow)",
          border: "1px solid var(--c-table-border)",
        }}
      >
        <span
          style={{
            color: "var(--c-tx1)",
            fontSize: emphasized ? "20px" : "15px",
            fontWeight: 700,
            lineHeight: emphasized ? "26px" : "20px",
          }}
        >
          {value}
        </span>
      </div>
    </div>
  )
}

interface FormFieldRHFProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label: string
}

export const FormFieldRHF = React.forwardRef<HTMLInputElement, FormFieldRHFProps>(
  function FormFieldRHF({ error, label, ...inputProps }, ref) {
    return (
      <label className="block">
        <span
          className="mb-1.5 block"
          style={{ color: "var(--c-tx2)", fontSize: "12px", fontWeight: 600, lineHeight: "16px" }}
        >
          {label}
        </span>
        <div
          className="glass-rim rounded-[8px] px-3 py-3"
          style={{
            background: "var(--c-cell-bg)",
            boxShadow: error
              ? "0 0 0 1.5px rgba(239, 68, 68, 0.70)"
              : "var(--c-unsel-shadow)",
          }}
        >
          <input
            ref={ref}
            {...inputProps}
            className="w-full border-none bg-transparent p-0 outline-none placeholder:opacity-50"
            style={{ color: "var(--c-tx1)", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}
          />
        </div>
        {error && (
          <p className="mt-1" style={{ color: "#ef4444", fontSize: "11px", lineHeight: "14px" }}>
            {error}
          </p>
        )}
      </label>
    )
  }
)
FormFieldRHF.displayName = "FormFieldRHF"
