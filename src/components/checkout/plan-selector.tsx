"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { SectionDivider } from "./section-divider"

type Plan = {
  id: string
  name: string
  dose: string
  duration: string
  price: number
  recommended?: boolean
}

interface PlanSelectorProps {
  plans: readonly Plan[]
  selected: string
  onChange: (id: string) => void
}

export function PlanSelector({ plans, selected, onChange }: PlanSelectorProps) {
  return (
    <div>
      <SectionDivider label="Recommended" />
      <div className="space-y-2 pt-1">
        {plans.map((plan) => {
          const isSelected = selected === plan.id
          return (
            <motion.button
              key={plan.id}
              onClick={() => onChange(plan.id)}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-5 px-[15px] py-[10px] rounded-xl text-left transition-shadow duration-200"
              style={
                isSelected
                  ? {
                      background: "#8B5CF6",
                      boxShadow: "var(--c-sel-glow)",
                    }
                  : {
                      background: "var(--c-cell-bg)",
                      boxShadow: "var(--c-unsel-shadow)",
                    }
              }
            >
              {/* Checkbox */}
              <div
                className="size-[30px] rounded-[8px] flex-shrink-0 flex items-center justify-center glass-rim"
                style={{
                  background: isSelected ? "#DDD6FE" : "var(--c-checkbox-bg)",
                  boxShadow: isSelected ? "none" : "var(--c-checkbox-shadow)",
                }}
              >
                {isSelected && (
                  <Check className="size-3.5 text-brand" strokeWidth={3} />
                )}
              </div>

              {/* Title & Subtitle */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-h6"
                  style={{ color: isSelected ? "#FFFFFF" : "var(--c-tx1)" }}
                >
                  {plan.name}
                </p>
                <p
                  className="text-xs leading-4 mt-1"
                  style={{ color: isSelected ? "#EDE9FE" : "var(--c-tx2)" }}
                >
                  {plan.dose} | {plan.duration}
                </p>
              </div>

              {/* Price */}
              <div className="text-right flex-shrink-0">
                <p
                  className="font-bold text-base leading-6"
                  style={{ color: isSelected ? "#FFFFFF" : "var(--c-tx1)" }}
                >
                  ${plan.price}
                </p>
                <p
                  className="text-xs leading-4"
                  style={{ color: isSelected ? "#EDE9FE" : "var(--c-tx2)" }}
                >
                  /month
                </p>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
