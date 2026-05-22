interface Spec {
  specification: string
  details: string
}

interface SpecsTableProps {
  specs: readonly Spec[]
}

export function SpecsTable({ specs }: SpecsTableProps) {
  return (
    <div
      className="w-full overflow-hidden"
      style={{ border: "1px solid var(--c-table-border)", borderRadius: "12px" }}
    >
      {/* Header */}
      <div
        className="flex items-center"
        style={{
          background: "rgba(139, 92, 246, 0.10)",
          boxShadow: "var(--c-table-header-shadow)",
          borderRadius: "12px 12px 0px 0px",
          height: "32px",
        }}
      >
        <div className="flex-1 flex items-center px-3" style={{ height: "32px" }}>
          <span style={{ fontSize: "14px", fontWeight: 600, lineHeight: "20px", color: "var(--c-tx1)" }}>
            Specification
          </span>
        </div>
        <div style={{ width: "1px", height: "32px", background: "var(--c-table-border)" }} />
        <div className="flex-1 flex items-center px-3" style={{ height: "32px" }}>
          <span style={{ fontSize: "14px", fontWeight: 600, lineHeight: "20px", color: "var(--c-tx1)" }}>
            Details
          </span>
        </div>
      </div>

      {/* Rows */}
      {specs.map((row) => (
        <div
          key={row.specification}
          className="flex items-center"
          style={{ borderTop: "1px solid var(--c-table-border)" }}
        >
          {/* Spec cell */}
          <div
            className="flex-1 flex items-center px-3"
            style={{ height: "44px", background: "var(--c-cell-bg)" }}
          >
            <span
              className="inline-block px-2"
              style={{
                border: "var(--c-tag-border)",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: 500,
                lineHeight: "20px",
                color: "var(--c-tx2)",
              }}
            >
              {row.specification}
            </span>
          </div>

          {/* Vertical divider */}
          <div style={{ width: "1px", height: "44px", background: "var(--c-table-border)", flexShrink: 0 }} />

          {/* Details cell */}
          <div
            className="flex-1 flex items-center px-3"
            style={{ height: "44px", background: "var(--c-cell-bg)" }}
          >
            <span
              className="inline-block px-2"
              style={{
                border: "var(--c-tag-border)",
                borderRadius: "4px",
                fontSize: "11px",
                fontWeight: 500,
                lineHeight: "16px",
                color: "var(--c-tx2)",
              }}
            >
              {row.details}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
