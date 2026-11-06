import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { buttonClass } from '@/components/ui'
import { links, nav } from '@/content/site'
import { focusHeroForm } from '@/lib/scroll'
import { cn } from '@/lib/cn'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-200',
        scrolled ? 'border-line bg-white/85 shadow-[0_1px_12px_rgb(15_17_23/0.04)] backdrop-blur-md' : 'border-transparent bg-white',
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1120px] items-center gap-6 px-4 sm:px-6">
        <a href="#hero" className="text-primary" aria-label="Ampliflow home">
          <Logo className="h-[22px] w-auto" />
        </a>
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.links.map((l) =>
            l.items ? (
              <div key={l.label} className="group relative">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm text-t2 hover:text-t1 group-focus-within:text-t1"
                  aria-haspopup="true"
                >
                  {l.label}
                  <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden />
                </button>
                <div className="invisible absolute left-0 top-full translate-y-1 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="min-w-[190px] rounded-lg border border-line bg-white p-1.5 shadow-[0_12px_32px_-12px_rgb(15_17_23/0.25)]">
                    {l.items.map((i) => (
                      <a key={i.label} href={i.href} className="block rounded-md px-3 py-2 text-sm text-t2 hover:bg-bg-1 hover:text-t1">
                        {i.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a key={l.label} href={l.href} className="rounded-md px-3 py-2 text-sm text-t2 hover:text-t1">
                {l.label}
              </a>
            ),
          )}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <a href={links.signIn} className="hidden rounded-md px-3 py-2 text-sm font-medium text-t1 hover:bg-bg-1 sm:inline-flex">
            {nav.signIn}
          </a>
          <motion.button whileTap={{ scale: 0.97 }} type="button" onClick={focusHeroForm} className={buttonClass('primary', 'sm')}>
            {nav.cta}
          </motion.button>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-md text-t1 hover:bg-bg-1 md:hidden"
            aria-label={menu ? 'Close menu' : 'Open menu'}
            aria-expanded={menu}
            onClick={() => setMenu((m) => !m)}
          >
            {menu ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menu && (
          <motion.nav
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line bg-white md:hidden"
          >
            <div className="grid gap-1 px-4 py-3">
              {nav.links.flatMap((l) => (l.items ? l.items : [{ label: l.label, href: l.href! }])).map((i) => (
                <a key={i.label} href={i.href} className="rounded-md px-2 py-2 text-[15px] text-t1 hover:bg-bg-1">
                  {i.label}
                </a>
              ))}
              <a href={links.signIn} className="rounded-md px-2 py-2 text-[15px] font-medium text-primary">
                {nav.signIn}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
