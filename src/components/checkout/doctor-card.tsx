import { UserCircle2 } from "lucide-react"

interface DoctorCardProps {
  name: string
  specialty: string
  imageUrl?: string
}

export function DoctorCard({ name, specialty, imageUrl }: DoctorCardProps) {
  return (
    <div
      className="flex items-center gap-2 w-full glass-rim"
      style={{
        padding: "4px 4px 4px 12px",
        borderTopLeftRadius: "16px",
        borderBottomLeftRadius: "16px",
        borderTopRightRadius: "34px",
        borderBottomRightRadius: "34px",
        background: "var(--c-cell-bg)",
        boxShadow: "var(--c-unsel-shadow)",
      }}
    >
      {/* Info */}
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <p className="text-h6 truncate" style={{ color: "var(--c-tx3)" }}>
          {name}
        </p>
        <p
          className="text-[12px] font-normal leading-4 truncate"
          style={{ color: "var(--c-tx2)" }}
        >
          {specialty}
        </p>
      </div>

      {/* Avatar */}
      <div
        className="size-[60px] rounded-full overflow-hidden flex-shrink-0 glass-rim flex items-center justify-center"
        style={{ boxShadow: "var(--c-avatar-shadow)" }}
      >
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <UserCircle2 className="size-10 text-brand/60" strokeWidth={1.25} />
        )}
      </div>
    </div>
  )
}
