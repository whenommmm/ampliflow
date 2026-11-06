import type { ComponentProps, ReactNode } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/cn'
import type { SectionId } from '@/content/sections'

export function MonoLabel({ children, className, dot = true }: { children: ReactNode; className?: string; dot?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-md border border-primary-line/60 bg-primary-dim px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-primary',
        className,
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-primary" aria-hidden />}
      {children}
    </span>
  )
}

type ButtonProps = ComponentProps<typeof motion.a> & { variant?: 'primary' | 'ghost' | 'dark'; size?: 'sm' | 'md' }

export function ButtonLink({ variant = 'primary', size = 'md', className, ...rest }: ButtonProps) {
  return (
    <motion.a
      whileTap={{ scale: 0.97 }}
      className={cn(buttonClass(variant, size), className)}
      {...rest}
    />
  )
}

export function buttonClass(variant: 'primary' | 'ghost' | 'dark' = 'primary', size: 'sm' | 'md' = 'md') {
  return cn(
    'inline-flex select-none items-center justify-center gap-2 rounded-md font-semibold transition-[background-color,box-shadow,color] duration-150',
    size === 'md' ? 'h-11 px-5 text-[15px]' : 'h-9 px-3.5 text-sm',
    variant === 'primary' &&
      'bg-primary text-white shadow-[0_1px_0_rgb(255_255_255/0.2)_inset,0_6px_16px_-6px_rgb(47_55_217/0.6)] hover:bg-primary-hi',
    variant === 'ghost' && 'border border-line bg-white text-t1 hover:border-line-hi hover:bg-bg-1',
    variant === 'dark' && 'bg-ink text-white hover:bg-[#1c1f29]',
  )
}

export function Section({
  id,
  className,
  children,
  ...rest
}: { id: SectionId; className?: string; children: ReactNode } & Omit<ComponentProps<'section'>, 'id'>) {
  return (
    <section id={id} data-section={id} className={cn('relative scroll-mt-24', className)} {...rest}>
      {children}
    </section>
  )
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-[1120px] px-4 sm:px-6', className)}>{children}</div>
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  align = 'left',
  className,
}: {
  eyebrow: ReactNode
  title: ReactNode
  sub?: ReactNode
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      <MonoLabel>{eyebrow}</MonoLabel>
      <h2 className="mt-4 text-[30px] font-bold leading-[1.08] tracking-[-0.03em] text-balance text-t1 sm:text-[40px]">{title}</h2>
      {sub && <p className="mt-3 text-[15px] leading-relaxed text-pretty text-t2 sm:text-base">{sub}</p>}
    </div>
  )
}

export function Avatar({ initials, className }: { initials: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'grid size-8 shrink-0 place-items-center rounded-full bg-primary-dim font-mono text-[11px] font-medium text-primary ring-1 ring-primary-line/40',
        className,
      )}
    >
      {initials}
    </span>
  )
}
