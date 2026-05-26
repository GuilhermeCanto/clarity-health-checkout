import { UserCircle2 } from "lucide-react"

interface DoctorCardProps {
  dark?: boolean
  name: string
  specialty: string
  imageUrl?: string
}

export function DoctorCard({ name, specialty, imageUrl, dark = false }: DoctorCardProps) {
  return (
    <div
      className="relative flex w-full items-center gap-2 overflow-hidden glass-rim"
      style={{
        padding: "4px 4px 4px 12px",
        borderTopLeftRadius: "16px",
        borderBottomLeftRadius: "16px",
        borderTopRightRadius: "34px",
        borderBottomRightRadius: "34px",
        background: "var(--c-doctor-glass-bg)",
        border: "var(--c-doctor-glass-border)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        boxShadow: "var(--c-doctor-glass-shadow)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          borderTopLeftRadius: "16px",
          borderBottomLeftRadius: "16px",
          borderTopRightRadius: "34px",
          borderBottomRightRadius: "34px",
          background: dark
            ? "linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.012) 44%, transparent 100%)"
            : "linear-gradient(135deg, rgba(196,181,253,0.36) 0%, rgba(196,181,253,0.14) 44%, transparent 100%)",
          opacity: dark ? 0.55 : 0.78,
        }}
      />

      <div className="relative flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-h6 truncate" style={{ color: "var(--c-tx3)" }}>
          {name}
        </p>
        <p className="text-[12px] font-normal leading-4 truncate" style={{ color: "var(--c-tx2)" }}>
          {specialty}
        </p>
      </div>

      <div
        className="relative flex size-[60px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full glass-rim"
        style={{ boxShadow: "var(--c-avatar-shadow)" }}
      >
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
        ) : (
          <UserCircle2 className="size-10 text-brand/60" strokeWidth={1.25} />
        )}
      </div>
    </div>
  )
}
