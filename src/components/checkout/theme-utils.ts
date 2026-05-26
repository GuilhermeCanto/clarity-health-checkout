"use client"

import type { CSSProperties } from "react"

export type CheckoutThemeId = "violet" | "ocean" | "emerald" | "rose" | "amber"

type CheckoutThemePalette = {
  id: CheckoutThemeId
  label: string
  accent: string
  accentRgb: string
  softRgb: string
  paleRgb: string
  glowRgb: string
}

export const CHECKOUT_THEMES: readonly CheckoutThemePalette[] = [
  {
    id: "violet",
    label: "Violet",
    accent: "#8B5CF6",
    accentRgb: "139 92 246",
    softRgb: "196 181 253",
    paleRgb: "237 233 254",
    glowRgb: "167 139 250",
  },
  {
    id: "ocean",
    label: "Ocean",
    accent: "#0EA5E9",
    accentRgb: "14 165 233",
    softRgb: "186 230 253",
    paleRgb: "240 249 255",
    glowRgb: "56 189 248",
  },
  {
    id: "emerald",
    label: "Emerald",
    accent: "#10B981",
    accentRgb: "16 185 129",
    softRgb: "167 243 208",
    paleRgb: "236 253 245",
    glowRgb: "52 211 153",
  },
  {
    id: "rose",
    label: "Rose",
    accent: "#F43F5E",
    accentRgb: "244 63 94",
    softRgb: "251 207 232",
    paleRgb: "255 241 242",
    glowRgb: "251 113 133",
  },
  {
    id: "amber",
    label: "Amber",
    accent: "#F59E0B",
    accentRgb: "245 158 11",
    softRgb: "253 230 138",
    paleRgb: "255 251 235",
    glowRgb: "251 191 36",
  },
] as const

export function getCheckoutTheme(themeId: CheckoutThemeId) {
  return CHECKOUT_THEMES.find((theme) => theme.id === themeId) ?? CHECKOUT_THEMES[0]
}

export function getCheckoutThemeVars(themeId: CheckoutThemeId, dark: boolean): CSSProperties {
  const theme = getCheckoutTheme(themeId)
  const vars: Record<string, string> = {
    "--theme-accent-solid": theme.accent,
    "--theme-accent-rgb": theme.accentRgb,
    "--theme-accent-soft-rgb": theme.softRgb,
    "--theme-accent-pale-rgb": theme.paleRgb,
    "--theme-accent-glow-rgb": theme.glowRgb,
    "--brand-primary": theme.accent,
    "--background-glass": dark
      ? `rgb(${theme.softRgb} / 0.05)`
      : `rgb(${theme.softRgb} / 0.20)`,
    "--c-glass-checkbox-selected-bg": theme.accent,
    "--c-glass-checkbox-selected-icon": "#FFFFFF",
    "--c-glass-checkbox-bg": dark
      ? "rgba(255, 255, 255, 0.08)"
      : `rgb(${theme.softRgb} / 0.08)`,
    "--c-glass-checkbox-border": dark
      ? "1px solid rgba(255, 255, 255, 0.10)"
      : `1px solid rgb(${theme.softRgb} / 0.16)`,
    "--c-glass-checkbox-shadow": dark
      ? `0 2px 8px rgb(${theme.accentRgb} / 0.12)`
      : `0 2px 8px rgb(${theme.accentRgb} / 0.18)`,
    "--c-doctor-glass-bg": dark
      ? "rgba(255, 255, 255, 0.015)"
      : `rgb(${theme.softRgb} / 0.10)`,
    "--c-doctor-glass-border": dark
      ? "1px solid rgba(255, 255, 255, 0.10)"
      : `1px solid rgb(${theme.softRgb} / 0.14)`,
    "--c-doctor-glass-shadow": dark
      ? "0 6px 18px rgba(0,0,0,0.10)"
      : `0 8px 22px rgba(15,23,42,0.07), 0 2px 7px rgb(${theme.softRgb} / 0.08)`,
    "--c-bar-quantity-bg": dark
      ? "rgba(34, 39, 57, 0.92)"
      : `rgb(${theme.paleRgb} / 0.82)`,
    "--c-bar-bg": dark
      ? "rgba(255, 255, 255, 0.05)"
      : `rgb(${theme.softRgb} / 0.10)`,
    "--c-bar-glow": dark
      ? "2px 4px 8px rgba(8, 14, 26, 0.20), -2px -4px 8px rgba(8, 14, 26, 0.20)"
      : `2px 4px 8px rgb(${theme.glowRgb} / 0.20), -2px -4px 8px rgb(${theme.glowRgb} / 0.20)`,
    "--c-minus-btn": dark
      ? "rgba(255, 255, 255, 0.05)"
      : `rgb(${theme.softRgb} / 0.72)`,
    "--c-sel-glow": dark
      ? `0px 0px 8px 3px rgb(${theme.accentRgb} / 0.18)`
      : `0px 0px 10px 5px rgb(${theme.glowRgb} / 0.35)`,
    "--c-tag-border": dark ? "none" : `0.5px solid rgb(${theme.softRgb} / 1)`,
    "--c-table-border": dark
      ? `rgb(${theme.softRgb} / 0.20)`
      : `rgb(${theme.softRgb} / 1)`,
    "--c-table-header-shadow": dark ? "none" : `0px 0px 10px 5px rgb(${theme.glowRgb} / 0.20)`,
    "--glass-liquid-bg": dark
      ? `rgb(${theme.softRgb} / 0.05)`
      : `rgb(${theme.softRgb} / 0.20)`,
    "--glass-liquid-border": dark
      ? "rgba(255, 255, 255, 0.10)"
      : "rgba(255, 255, 255, 0.60)",
    "--glass-liquid-shadow": dark
      ? `2px 4px 8px rgb(${theme.glowRgb} / 0.10), -2px -4px 8px rgb(${theme.glowRgb} / 0.10)`
      : `2px 4px 8px rgb(${theme.glowRgb} / 0.20), -2px -4px 8px rgb(${theme.glowRgb} / 0.20)`,
  }

  return vars as CSSProperties
}
