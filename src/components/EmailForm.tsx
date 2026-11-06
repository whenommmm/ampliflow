import { useId, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from 'motion/react'
import { ArrowRight, Check } from 'lucide-react'
import { buildSignupUrl, isValidEmail, readRef } from '@/lib/signup'
import { useRegisterForm } from '@/lib/formVisibility'
import { hero, links } from '@/content/site'
import { cn } from '@/lib/cn'

type Props = { source: 'hero' | 'closing'; tone?: 'light' | 'dark'; className?: string }

export function EmailForm({ source, tone = 'light', className }: Props) {
  const inputId = useId()
  const errorId = useId()
  const wrapRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [sentTo, setSentTo] = useState<string | null>(null)
  const shake = useAnimationControls()
  const reduce = useReducedMotion()
  useRegisterForm(`form-${source}`, wrapRef)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isValidEmail(email)) {
      setError('Please enter a valid work email.')
      inputRef.current?.focus()
      if (!reduce) shake.start({ x: [0, -7, 6, -4, 3, 0], transition: { duration: 0.36 } })
      return
    }
    setError(null)
    // In production: POST to /api/waitlist first (keeps lead capture + referrals),
    // then redirect. This concept page never calls Ampliflow's API.
    const url = buildSignupUrl(email, readRef(window.location.search))
    window.open(url, '_blank', 'noopener') // synchronous: stays inside the click, so pop-up blockers allow it
    setSentTo(url)
  }

  const dark = tone === 'dark'

  return (
    <div ref={wrapRef} className={cn('w-full max-w-[480px]', className)} data-form={source}>
      <AnimatePresence mode="wait" initial={false}>
        {sentTo ? (
          <motion.div
            key="done"
            role="status"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={cn(
              'flex items-center gap-3 rounded-[10px] border p-3 text-left',
              dark ? 'border-white/20 bg-white/10 text-white' : 'border-line bg-white shadow-sm',
            )}
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 18, delay: 0.05 }}
              className="grid size-8 shrink-0 place-items-center rounded-full bg-ok text-white"
            >
              <Check className="size-4" strokeWidth={3} aria-hidden />
            </motion.span>
            <div className="min-w-0 text-sm">
              <p className="font-semibold">Saved. Sign-up opened with your email filled in.</p>
              <a href={sentTo} target="_blank" rel="noopener" className={cn('font-medium underline-offset-2 hover:underline', dark ? 'text-white/80' : 'text-primary')}>
                Continue to sign-up <ArrowRight className="inline size-3.5" aria-hidden />
              </a>
            </div>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} noValidate exit={{ opacity: 0, y: -6 }} animate={shake}>
            <div
              className={cn(
                'flex flex-col gap-2 rounded-[10px] border p-1.5 transition-[border-color,box-shadow] duration-150 sm:flex-row sm:items-center sm:gap-0',
                dark
                  ? 'border-white/20 bg-white/10 focus-within:border-white/50'
                  : 'border-line bg-white shadow-[0_1px_2px_rgb(15_17_23/0.04)] focus-within:border-primary-line focus-within:shadow-[0_0_0_4px_rgb(47_55_217/0.08)]',
                error && 'border-danger/60',
              )}
            >
              <label htmlFor={inputId} className="sr-only">
                Work email
              </label>
              <input
                ref={inputRef}
                id={inputId}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (error) setError(null)
                }}
                aria-invalid={!!error}
                aria-describedby={error ? errorId : undefined}
                className={cn(
                  'h-11 min-w-0 flex-1 rounded-md bg-transparent px-3 text-[15px] outline-none',
                  dark ? 'text-white placeholder:text-white/50' : 'text-t1 placeholder:text-t3',
                )}
              />
              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                className={cn(
                  'group inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-[15px] font-semibold transition-colors',
                  dark ? 'bg-white text-primary hover:bg-white/90' : 'bg-primary text-white hover:bg-primary-hi',
                )}
              >
                {hero.cta}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
              </motion.button>
            </div>
            <AnimatePresence>
              {error && (
                <motion.p
                  id={errorId}
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={cn('mt-2 text-left text-sm font-medium', dark ? 'text-red-200' : 'text-danger')}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
      <div className={cn('mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]', dark ? 'text-white/70' : 'text-t3', source === 'hero' && 'justify-center')}>
        <a
          href={links.signUp}
          target="_blank"
          rel="noopener"
          className={cn('inline-flex items-center gap-1.5 font-medium underline-offset-2 hover:underline', dark ? 'text-white' : 'text-t1')}
        >
          <GoogleG /> {hero.google}
        </a>
        <span aria-hidden className="hidden sm:inline">·</span>
        <span className="w-full sm:w-auto">{hero.fine}</span>
      </div>
    </div>
  )
}

function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" className="size-3.5" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  )
}
