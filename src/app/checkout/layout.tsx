export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-start justify-center bg-zinc-200 dark:bg-zinc-950">
      <div className="relative w-full max-w-[390px] min-h-screen overflow-x-hidden">
        {children}
      </div>
    </div>
  )
}
