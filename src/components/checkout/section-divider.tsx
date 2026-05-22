interface SectionDividerProps {
  label: string
}

export function SectionDivider({ label }: SectionDividerProps) {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px" style={{ background: "var(--c-divider)" }} />
      <span className="text-sm font-semibold whitespace-nowrap" style={{ color: "var(--c-tx1)" }}>
        {label}
      </span>
      <div className="flex-1 h-px" style={{ background: "var(--c-divider)" }} />
    </div>
  )
}
