"use client"

import { type ReactNode } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, Heart } from "lucide-react"
import { useRouter } from "next/navigation"

import { StatusBar } from "@/components/checkout/status-bar"
import { ARCH_CLIP_PATH, EASE } from "@/lib/checkout"

interface CheckoutPageFrameProps {
  backHref: string
  children: ReactNode
  dark?: boolean
  footer: ReactNode
  hero: ReactNode
  title: string
  titleSize?: "h4" | "h5"
}

export function CheckoutPageFrame({
  backHref,
  children,
  dark = false,
  footer,
  hero,
  title,
  titleSize = "h4",
}: CheckoutPageFrameProps) {
  const router = useRouter()

  return (
    <div className={[dark ? "dark" : "", "relative min-h-screen bg-page font-sans"].join(" ").trim()}>
      <div className="fixed top-0 left-1/2 z-50 w-full max-w-[390px] -translate-x-1/2 pointer-events-none">
        <div
          className="pointer-events-auto"
          style={{
            background: "var(--c-header-blur)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
          }}
        >
          <StatusBar />
        </div>

        <div className="flex items-center justify-between px-4 pointer-events-auto">
          <motion.button
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => router.push(backHref)}
            className="flex size-12 items-center justify-center rounded-full glass-rim"
            style={{
              background: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            <ChevronLeft className="size-5" style={{ color: "var(--c-tx1)" }} strokeWidth={2} />
          </motion.button>

          <div className="px-4 text-center">
            <h1
              style={{
                color: "var(--c-tx1)",
                fontSize: titleSize === "h4" ? "28px" : "24px",
                fontWeight: 700,
                lineHeight: titleSize === "h4" ? "34px" : "28px",
              }}
            >
              {title}
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex size-12 items-center justify-center rounded-full glass-rim"
            style={{
              background: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            <Heart className="size-5" style={{ color: "var(--c-tx1)" }} strokeWidth={2} />
          </motion.div>
        </div>
      </div>

      <div
        className="relative -mt-[25px] w-full"
        style={{ aspectRatio: "9/7", isolation: "isolate", zIndex: 1 }}
      >
        {hero}
      </div>

      <div className="relative z-10 mx-3 -mt-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative"
          style={{ clipPath: ARCH_CLIP_PATH }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "var(--glass-liquid-bg)",
              backdropFilter: "blur(var(--glass-liquid-blur))",
              WebkitBackdropFilter: "blur(var(--glass-liquid-blur))",
              boxShadow: "var(--glass-liquid-shadow)",
            }}
          />

          <div className="relative px-5 pb-40 pt-16">
            <div className="mb-6 flex justify-center">
              <div className="h-1 w-9 rounded-full" style={{ background: "rgba(196,181,253,0.5)" }} />
            </div>
            {children}
          </div>
        </motion.div>
      </div>

      {footer}
    </div>
  )
}
