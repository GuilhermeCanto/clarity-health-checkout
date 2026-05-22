export const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

export const ARCH_CLIP_PATH =
  "path('M 183,0 C 233,0 273,22 273,48 L 338,48 Q 366,48 366,76 L 366,4000 Q 366,4028 338,4028 L 28,4028 Q 0,4028 0,4000 L 0,76 Q 0,48 28,48 L 93,48 C 93,22 133,0 183,0 Z')"

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.06, ease: EASE },
  }),
}
