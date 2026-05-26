interface Spec {
  specification: string
  details: string
}

interface SpecsTableProps {
  specs: readonly Spec[]
}

export function SpecsTable({ specs }: SpecsTableProps) {
  return (
    <div className="w-full overflow-hidden rounded-[12px]" style={{ border: "1px solid var(--c-table-border)" }}>
      <div
        className="glass-liquid flex items-center overflow-hidden rounded-t-[12px]"
        style={{
          height: "32px",
          boxShadow: "var(--c-table-header-shadow)",
          borderBottom: "1px solid var(--c-table-border)",
        }}
      >
        <div className="flex-1 px-3">
          <span style={{ color: "var(--c-tx1)", fontSize: "14px", fontWeight: 600, lineHeight: "20px" }}>
            Specification
          </span>
        </div>
        <div style={{ width: "1px", height: "32px", background: "var(--c-table-border)" }} />
        <div className="flex-1 px-3">
          <span style={{ color: "var(--c-tx1)", fontSize: "14px", fontWeight: 600, lineHeight: "20px" }}>
            Details
          </span>
        </div>
      </div>

      <div className="space-y-0">
        {specs.map((row) => (
          <div key={row.specification} className="flex items-center" style={{ borderTop: "1px solid var(--c-table-border)" }}>
            <div className="flex-1 px-3 py-3">
              <span style={{ color: "var(--c-tx2)", fontSize: "12px", fontWeight: 500, lineHeight: "16px" }}>
                {row.specification}
              </span>
            </div>
            <div style={{ width: "1px", alignSelf: "stretch", background: "var(--c-table-border)" }} />
            <div className="flex-1 px-3 py-3">
              <span style={{ color: "var(--c-tx1)", fontSize: "12px", fontWeight: 500, lineHeight: "16px" }}>
                {row.details}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
