"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react"
import { Check, Palette } from "lucide-react"

import {
  CHECKOUT_THEMES,
  type CheckoutThemeId,
  getCheckoutThemeVars,
} from "@/components/checkout/theme-utils"

type CheckoutThemeContextValue = {
  dark: boolean
  themeId: CheckoutThemeId
  setThemeId: (themeId: CheckoutThemeId) => void
  toggleDark: () => void
}

const CheckoutThemeContext = createContext<CheckoutThemeContextValue | null>(null)

const THEME_STORAGE_KEY = "checkout-theme-id"
const DARK_STORAGE_KEY = "checkout-theme-dark"
const THEME_PICKER_SIDE_KEY = "checkout-theme-picker-side"
const THEME_PICKER_TOP_KEY = "checkout-theme-picker-top"
const PICKER_SIZE = 42
const PICKER_MARGIN = 12
const PICKER_MIN_TOP = 88
const PICKER_BOTTOM_CLEARANCE = 132
const DRAG_THRESHOLD = 6

function ThemePickerButton({
  dark,
  themeId,
  onSelectTheme,
}: {
  dark: boolean
  themeId: CheckoutThemeId
  onSelectTheme: (themeId: CheckoutThemeId) => void
}) {
  const [open, setOpen] = useState(false)
  const frameRef = useRef<HTMLDivElement | null>(null)
  const dragStartRef = useRef<{ pointerId: number; offsetX: number; offsetY: number } | null>(null)
  const [anchorSide, setAnchorSide] = useState<"left" | "right">(() => {
    if (typeof window === "undefined") return "right"
    return window.localStorage.getItem(THEME_PICKER_SIDE_KEY) === "left" ? "left" : "right"
  })
  const [topOffset, setTopOffset] = useState(() => {
    if (typeof window === "undefined") return 460
    const stored = Number(window.localStorage.getItem(THEME_PICKER_TOP_KEY))
    return Number.isFinite(stored) ? stored : 460
  })
  const [dragPosition, setDragPosition] = useState<{ x: number; y: number } | null>(null)
  const [didDrag, setDidDrag] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem(THEME_PICKER_SIDE_KEY, anchorSide)
  }, [anchorSide])

  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem(THEME_PICKER_TOP_KEY, String(topOffset))
  }, [topOffset])

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    const frame = frameRef.current
    if (!frame) return

    const rect = frame.getBoundingClientRect()
    const currentX = dragPosition?.x ?? (anchorSide === "left" ? PICKER_MARGIN : rect.width - PICKER_SIZE - PICKER_MARGIN)
    const currentY = dragPosition?.y ?? topOffset

    dragStartRef.current = {
      pointerId: event.pointerId,
      offsetX: event.clientX - (rect.left + currentX),
      offsetY: event.clientY - currentY,
    }

    setDidDrag(false)
    setOpen(false)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const dragState = dragStartRef.current
    const frame = frameRef.current

    if (!dragState || !frame || dragState.pointerId !== event.pointerId) return

    const rect = frame.getBoundingClientRect()
    const maxX = rect.width - PICKER_SIZE - PICKER_MARGIN
    const maxY = Math.max(PICKER_MIN_TOP, window.innerHeight - PICKER_BOTTOM_CLEARANCE)
    const nextX = Math.min(maxX, Math.max(PICKER_MARGIN, event.clientX - rect.left - dragState.offsetX))
    const nextY = Math.min(maxY, Math.max(PICKER_MIN_TOP, event.clientY - dragState.offsetY))

    if (
      !didDrag &&
      (Math.abs(nextX - (dragPosition?.x ?? (anchorSide === "left" ? PICKER_MARGIN : rect.width - PICKER_SIZE - PICKER_MARGIN))) > DRAG_THRESHOLD ||
        Math.abs(nextY - (dragPosition?.y ?? topOffset)) > DRAG_THRESHOLD)
    ) {
      setDidDrag(true)
    }

    setDragPosition({ x: nextX, y: nextY })
  }

  const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    const dragState = dragStartRef.current
    const frame = frameRef.current

    if (!dragState || !frame || dragState.pointerId !== event.pointerId) return

    const rect = frame.getBoundingClientRect()
    const finalPosition = dragPosition ?? {
      x: anchorSide === "left" ? PICKER_MARGIN : rect.width - PICKER_SIZE - PICKER_MARGIN,
      y: topOffset,
    }

    const maxY = Math.max(PICKER_MIN_TOP, window.innerHeight - PICKER_BOTTOM_CLEARANCE)
    setAnchorSide(finalPosition.x + PICKER_SIZE / 2 < rect.width / 2 ? "left" : "right")
    setTopOffset(Math.min(maxY, Math.max(PICKER_MIN_TOP, finalPosition.y)))
    setDragPosition(null)
    dragStartRef.current = null
    event.currentTarget.releasePointerCapture(event.pointerId)
  }

  const handlePointerCancel = () => {
    dragStartRef.current = null
    setDragPosition(null)
    setDidDrag(false)
  }

  const clampedTop =
    typeof window === "undefined"
      ? topOffset
      : Math.min(Math.max(PICKER_MIN_TOP, topOffset), Math.max(PICKER_MIN_TOP, window.innerHeight - PICKER_BOTTOM_CLEARANCE))

  const pickerPosition = dragPosition
    ? {
        left: dragPosition.x,
        top: dragPosition.y,
      }
    : {
        [anchorSide]: `${PICKER_MARGIN}px`,
        top: `${clampedTop}px`,
      }

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] flex justify-center">
      <div ref={frameRef} className="relative h-full w-full max-w-[390px]">
        <div
          className="pointer-events-auto absolute flex flex-col gap-3"
          style={{
            alignItems: anchorSide === "left" ? "flex-start" : "flex-end",
            ...pickerPosition,
          }}
        >
          {open ? (
            <div
              className="rounded-[18px] p-3 glass-rim"
              style={{
                background: dark ? "rgba(15, 23, 42, 0.86)" : "rgba(255, 255, 255, 0.88)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                boxShadow: dark ? "0 14px 28px rgba(0,0,0,0.28)" : "0 14px 28px rgba(15,23,42,0.10)",
              }}
            >
              <div className="grid grid-cols-3 gap-3">
                {CHECKOUT_THEMES.map((theme) => {
                  const selected = theme.id === themeId
                  return (
                    <button
                      key={theme.id}
                      onClick={() => {
                        onSelectTheme(theme.id)
                        setOpen(false)
                      }}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <span
                        className="relative flex h-10 w-10 items-center justify-center rounded-full"
                        style={{
                          background: `linear-gradient(135deg, rgb(${theme.softRgb}) 0%, ${theme.accent} 100%)`,
                          boxShadow: selected
                            ? `0 0 0 2px rgba(255,255,255,0.85), 0 0 0 5px rgb(${theme.accentRgb} / 0.25)`
                            : dark
                              ? "0 8px 18px rgba(0,0,0,0.24)"
                              : "0 8px 18px rgba(15,23,42,0.12)",
                        }}
                      >
                        {selected ? <Check className="size-4 text-white" strokeWidth={3} /> : null}
                      </span>
                      <span
                        style={{
                          color: dark ? "#E5E7EB" : "#374151",
                          fontSize: "11px",
                          fontWeight: 600,
                          lineHeight: "14px",
                        }}
                      >
                        {theme.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          ) : null}

          <button
            onClick={() => {
              if (didDrag) {
                setDidDrag(false)
                return
              }
              setOpen((value) => !value)
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            className="glass-rim flex items-center justify-center rounded-full touch-none"
            style={{
              width: `${PICKER_SIZE}px`,
              height: `${PICKER_SIZE}px`,
              background: dark
                ? "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)"
                : "linear-gradient(135deg, rgba(255,255,255,0.72) 0%, rgb(var(--theme-accent-soft-rgb) / 0.28) 100%)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow: dark
                ? "0 10px 24px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.08)"
                : "0 12px 24px rgba(15,23,42,0.12), inset 0 1px 0 rgba(255,255,255,0.48)",
              color: dark ? "#FFFFFF" : "#111827",
              cursor: dragPosition ? "grabbing" : "grab",
            }}
            aria-label="Open checkout color themes"
          >
            <Palette className="size-[18px]" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  )
}

export function CheckoutThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false

    return window.localStorage.getItem(DARK_STORAGE_KEY) === "true"
  })
  const [themeId, setThemeId] = useState<CheckoutThemeId>(() => {
    if (typeof window === "undefined") return "violet"

    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY) as CheckoutThemeId | null
    return CHECKOUT_THEMES.some((theme) => theme.id === savedTheme) ? savedTheme : "violet"
  })

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, themeId)
  }, [themeId])

  useEffect(() => {
    window.localStorage.setItem(DARK_STORAGE_KEY, String(dark))
  }, [dark])

  const value = useMemo(
    () => ({
      dark,
      themeId,
      setThemeId,
      toggleDark: () => setDark((value) => !value),
    }),
    [dark, themeId]
  )

  const themeVars = useMemo(() => getCheckoutThemeVars(themeId, dark), [themeId, dark])

  return (
    <CheckoutThemeContext.Provider value={value}>
      <div className={dark ? "dark" : ""} style={themeVars as CSSProperties}>
        {children}
        <ThemePickerButton dark={dark} themeId={themeId} onSelectTheme={setThemeId} />
      </div>
    </CheckoutThemeContext.Provider>
  )
}

export function useCheckoutTheme() {
  const context = useContext(CheckoutThemeContext)

  if (!context) {
    throw new Error("useCheckoutTheme must be used within CheckoutThemeProvider")
  }

  return context
}
