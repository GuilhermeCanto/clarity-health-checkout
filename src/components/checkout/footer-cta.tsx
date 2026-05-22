"use client"

import { type ReactNode } from "react"
import { motion } from "framer-motion"

interface FooterCtaProps {
  hidden?: boolean
  icon?: ReactNode
  label: string
  onClick: () => void
}

const innerBtnShadow =
  "0px 0px 2px 2px rgba(120, 120, 120, 0.25), inset 2px 2px 1px 0px rgba(255, 255, 255, 0.45)"

export function FooterCta({ hidden, icon, label, onClick }: FooterCtaProps) {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={hidden ? { y: 120, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: hidden ? 0 : 0.2 }}
      className="fixed bottom-0 left-1/2 z-50 w-full max-w-[390px] -translate-x-1/2 px-3 pb-6 pt-3 pointer-events-none"
    >
      <div
        className="w-full rounded-[28px] px-3 py-3 pointer-events-auto"
        style={{
          background: "var(--c-bar-bg)",
          backdropFilter: "blur(80px)",
          WebkitBackdropFilter: "blur(80px)",
        }}
      >
        <div
          className="glass-rim"
          style={{
            padding: "4px",
            borderRadius: "9999px",
            background: "var(--c-cell-bg)",
            boxShadow: "var(--c-bar-glow)",
            backdropFilter: "blur(80px)",
            WebkitBackdropFilter: "blur(80px)",
          }}
        >
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="glass-rim flex h-[52px] w-full items-center justify-center gap-3 rounded-full px-5 transition-all"
            style={{
              background: "#8B5CF6",
              boxShadow: innerBtnShadow,
            }}
          >
            {icon}
            <span style={{ fontSize: "16px", fontWeight: 700, lineHeight: "20px", color: "#FFFFFF" }}>
              {label}
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
