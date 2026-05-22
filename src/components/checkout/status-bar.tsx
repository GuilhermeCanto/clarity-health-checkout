"use client"

import { Signal, Wifi, Battery } from "lucide-react"

export function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1">
      <span style={{ fontSize: "14px", fontWeight: 400, lineHeight: "20px", color: "var(--c-tx1)", fontFamily: "DM Sans, sans-serif" }}>
        9:41
      </span>
      <div className="flex items-center gap-1.5" style={{ color: "var(--c-tx1)" }}>
        <Signal className="size-[14px]" strokeWidth={2} />
        <Wifi className="size-[14px]" strokeWidth={2} />
        <Battery className="size-[16px]" strokeWidth={2} />
      </div>
    </div>
  )
}
