"use client"

import { motion } from "framer-motion"
import { Minus, Plus } from "lucide-react"

interface BottomBarProps {
  price: number
  quantity: number
  onDecrement: () => void
  onIncrement: () => void
  onAddToCart: () => void
}

const innerBtnShadow =
  "0px 0px 2px 2px rgba(120, 120, 120, 0.25), inset 2px 2px 1px 0px rgba(255, 255, 255, 0.45)"

export function BottomBar({
  price,
  quantity,
  onDecrement,
  onIncrement,
  onAddToCart,
}: BottomBarProps) {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] px-3 pb-6 pt-3 z-50"
    >
      {/* Dock background */}
      <div
        className="w-full rounded-[28px] px-3 py-3"
        style={{
          background: "var(--c-bar-bg)",
          backdropFilter: "blur(80px)",
          WebkitBackdropFilter: "blur(80px)",
        }}
      >
        <div className="flex items-center gap-5">

          {/* ── Quantity Selector pill ───────────────────── */}
          <div
            className="flex items-center gap-4 flex-shrink-0 glass-rim"
            style={{
              padding: "4px 4px",
              borderRadius: "9999px",
              background: "var(--c-cell-bg)",
              boxShadow: "var(--c-bar-glow)",
              backdropFilter: "blur(80px)",
              WebkitBackdropFilter: "blur(80px)",
            }}
          >
            {/* Minus button */}
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={onDecrement}
              disabled={quantity <= 1}
              className="flex items-center justify-center disabled:opacity-40 glass-rim"
              style={{
                width: "46px",
                height: "46px",
                borderRadius: "9999px",
                background: "var(--c-minus-btn)",
                boxShadow: innerBtnShadow,
              }}
            >
              <Minus className="size-[18px] text-brand" strokeWidth={2.5} />
            </motion.button>

            {/* Quantity */}
            <span
              className="w-5 text-center tabular-nums"
              style={{ fontSize: "18px", fontWeight: 600, lineHeight: "28px", color: "var(--c-tx2)" }}
            >
              {quantity}
            </span>

            {/* Plus button */}
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={onIncrement}
              className="flex items-center justify-center glass-rim"
              style={{
                width: "46px",
                height: "46px",
                borderRadius: "9999px",
                background: "#8B5CF6",
                boxShadow: innerBtnShadow,
              }}
            >
              <Plus className="size-[18px] text-white" strokeWidth={2.5} />
            </motion.button>
          </div>

          {/* ── Buy Button ───────────────────────────────── */}
          <div
            className="flex-1 glass-rim"
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
              whileTap={{ scale: 0.97 }}
              onClick={onAddToCart}
              className="w-full flex items-center justify-center glass-rim"
              style={{
                gap: "16px",
                padding: "0 16px",
                height: "46px",
                borderRadius: "9999px",
                background: "#8B5CF6",
                boxShadow: innerBtnShadow,
              }}
            >
              <span style={{ fontSize: "15px", fontWeight: 600, lineHeight: "20px", color: "#FFFFFF", whiteSpace: "nowrap" }}>
                Add item
              </span>
              <span style={{ fontSize: "18px", fontWeight: 700, lineHeight: "28px", color: "#FFFFFF", whiteSpace: "nowrap" }}>
                ${price * quantity}
              </span>
            </motion.button>
          </div>

        </div>
      </div>
    </motion.div>
  )
}
