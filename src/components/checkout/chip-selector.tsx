"use client"

import { motion } from "framer-motion"

interface ChipSelectorProps {
  label: string
  options: readonly string[]
  selected: string
  onChange: (value: string) => void
}

export function ChipSelector({ label, options, selected, onChange }: ChipSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="text-xs font-medium flex-shrink-0 w-[58px]"
        style={{ color: "var(--c-tx1)" }}
      >
        {label}
      </span>
      <div className="flex flex-1 gap-2">
        {options.map((option) => {
          const isSelected = selected === option
          return (
            <motion.button
              key={option}
              onClick={() => onChange(option)}
              whileTap={{ scale: 0.96 }}
              className="flex-1 flex items-center justify-center py-[6px] px-[12px] rounded-[8px] glass-rim transition-shadow duration-200"
              style={
                isSelected
                  ? {
                      background: "var(--brand-primary)",
                      boxShadow: "var(--c-sel-glow)",
                    }
                  : {
                      background: "var(--c-cell-bg)",
                      boxShadow: "var(--c-unsel-shadow)",
                    }
              }
            >
              <span
                className="text-[12px] font-medium leading-4 whitespace-nowrap"
                style={{ color: isSelected ? "#FFFFFF" : "var(--c-tx2)" }}
              >
                {option}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
