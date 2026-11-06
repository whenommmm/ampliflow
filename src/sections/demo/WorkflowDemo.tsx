import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CheckCircle2, Clock3, Eye, GitBranch, MessageSquareText, PauseCircle, Play, UserPlus } from 'lucide-react'
import { WORKFLOW_CAMPAIGN, WORKFLOW_LEAD, WORKFLOW_STEPS, type WorkflowStep } from '@/content/demo'
import { cn } from '@/lib/cn'

const EVENTS: Record<string, string> = {
  start: `${WORKFLOW_LEAD.name} added from a search import`,
  visit: 'Visited Meera’s profile',
  wait1: 'Waiting 1 day, inside working hours',
  invite: 'Invite sent with a personal note',
  wait3: 'Waiting up to 3 days for acceptance',
  ifconn: 'Meera accepted → connected branch',
  message: 'Message sent (variant B)',
  reply: 'Meera replied: “Sure, Thursday works.” Sequence paused.',
}

const ICON: Record<string, typeof Eye> = {
  start: Play,
  visit: Eye,
  invite: UserPlus,
  ifconn: GitBranch,
  message: MessageSquareText,
  reply: PauseCircle,
}

const LAST = WORKFLOW_STEPS.length - 1
const HOLD_TICKS = 4

const PICK_HOLD_MS = 5000

export function WorkflowDemo({ active, reduce }: { active: boolean; reduce: boolean }) {
  const [tick, setTick] = useState(reduce ? LAST : 0)
  const [held, setHeld] = useState(false)

  useEffect(() => {
    if (reduce && !held) {
      setTick(LAST)
      return
    }
    if (!active || held) return
    const id = window.setInterval(() => setTick((t) => (t >= LAST + HOLD_TICKS ? 0 : t + 1)), 850)
    return () => window.clearInterval(id)
  }, [active, reduce, held])

  // A visitor picked a step: park the lead there for a moment, then let the run continue.
  useEffect(() => {
    if (!held) return
    const id = window.setTimeout(() => setHeld(false), PICK_HOLD_MS)
    return () => window.clearTimeout(id)
  }, [held, tick])

  const pick = (i: number) => {
    setTick(i)
    setHeld(true)
  }

  const cur = Math.min(tick, LAST)
  const log = WORKFLOW_STEPS.slice(0, cur + 1).map((s) => ({ id: s.id, text: EVENTS[s.id] })).reverse()

  return (
    <div className="grid h-full gap-4 md:grid-cols-[1fr_250px]">
      <div className="relative flex flex-col items-center overflow-hidden rounded-lg border border-line-lo bg-bg-1 bg-[radial-gradient(rgb(15_17_23/0.09)_1px,transparent_1px)] bg-[size:16px_16px] px-3 py-4">
        <ol className="flex w-full max-w-[360px] flex-col items-stretch" aria-label={`${WORKFLOW_CAMPAIGN.name} sequence`}>
          {WORKFLOW_STEPS.map((step, i) => (
            <li key={step.id} className="flex flex-col items-center">
              {i > 0 && <Connector lit={i <= cur} />}
              {step.kind === 'delay' ? (
                <DelayChip step={step} here={i === cur} passed={i < cur} onPick={() => pick(i)} />
              ) : (
                <Node step={step} index={i} cur={cur} onPick={() => pick(i)} />
              )}
            </li>
          ))}
        </ol>
      </div>
      <div className="hidden min-h-0 flex-col rounded-lg border border-line-lo bg-white md:flex">
        <div className="flex items-center justify-between border-b border-line-lo px-3 py-2.5">
          <span className="text-xs font-semibold text-t1">Run log</span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ok">
            <span className="size-1.5 animate-pulse rounded-full bg-ok" /> live
          </span>
        </div>
        <ul className="flex-1 space-y-1 overflow-hidden p-2">
          <AnimatePresence initial={false}>
            {log.map((e, i) => (
              <motion.li
                key={e.id}
                layout
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: i === 0 ? 1 : 0.55, x: 0 }}
                exit={{ opacity: 0 }}
                className={cn('rounded-md px-2.5 py-2 text-[12px] leading-snug', i === 0 ? 'bg-primary-dim text-t1' : 'text-t2')}
              >
                {e.text}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
      <p className="-mt-1 truncate rounded-md bg-primary-dim px-3 py-2 text-[12px] text-t1 md:hidden" aria-live="polite">
        {EVENTS[WORKFLOW_STEPS[cur].id]}
      </p>
    </div>
  )
}

function Connector({ lit }: { lit: boolean }) {
  return (
    <span aria-hidden className="relative block h-2.5 w-px bg-line-hi">
      <motion.span className="absolute inset-0 origin-top bg-primary" initial={false} animate={{ scaleY: lit ? 1 : 0 }} transition={{ duration: 0.25 }} />
    </span>
  )
}

function DelayChip({ step, here, passed, onPick }: { step: WorkflowStep; here: boolean; passed: boolean; onPick: () => void }) {
  return (
    <button
      type="button"
      onClick={onPick}
      aria-current={here ? 'step' : undefined}
      className={cn(
        'relative inline-flex items-center gap-1.5 rounded-full border bg-white px-2.5 py-1 font-mono text-[11px] transition-colors',
        here ? 'border-primary text-primary' : passed ? 'border-primary-line text-t2' : 'border-line text-t3',
      )}
    >
      <Clock3 className={cn('size-3', here && 'animate-spin [animation-duration:1.2s]')} aria-hidden />
      {step.title}
      {here && <Token />}
    </button>
  )
}

function Node({ step, index, cur, onPick }: { step: WorkflowStep; index: number; cur: number; onPick: () => void }) {
  const here = index === cur
  const passed = index < cur
  const Icon = ICON[step.id] ?? Play
  const done = step.done !== undefined ? step.done + (index <= cur && index > 0 ? 1 : 0) : undefined
  const tone =
    step.kind === 'logic' ? 'bg-emerald-50 text-emerald-700' : step.kind === 'event' ? 'bg-amber-50 text-amber-700' : step.kind === 'start' ? 'bg-primary text-white' : 'bg-primary-dim text-primary'

  return (
    <motion.button
      type="button"
      onClick={onPick}
      aria-current={here ? 'step' : undefined}
      whileTap={{ scale: 0.98 }}
      animate={here ? { scale: 1.02 } : { scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 24 }}
      className={cn(
        'relative flex w-full cursor-pointer items-center gap-2.5 rounded-lg border bg-white px-2.5 py-1.5 text-left transition-[border-color,box-shadow] duration-200 hover:border-primary-line',
        here ? 'border-primary shadow-[0_0_0_4px_rgb(47_55_217/0.12),0_8px_20px_-10px_rgb(47_55_217/0.5)]' : passed ? 'border-primary-line' : 'border-line',
      )}
    >
      <span className={cn('grid size-7 shrink-0 place-items-center rounded-md', tone)}>
        <Icon className="size-3.5" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5 text-[13px] font-semibold text-t1">
          {step.title}
          {passed && <CheckCircle2 className="size-3.5 text-primary" aria-label="done" />}
        </span>
        {step.detail && <span className="block truncate text-[11.5px] text-t3">{step.detail}</span>}
      </span>
      {done !== undefined && (
        <span className="relative font-mono text-[11px] text-t2">
          <span className="text-primary">{done}</span>/{step.total}
          <AnimatePresence>
            {here && (
              <motion.span
                key="plus"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], y: -14 }}
                transition={{ duration: 0.8 }}
                className="absolute -top-1 right-0 font-semibold text-primary"
                aria-hidden
              >
                +1
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      )}
      {here && <Token />}
    </motion.button>
  )
}

function Token() {
  return (
    <motion.span
      layoutId="lead-token"
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      className="absolute -left-3 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-full bg-primary font-mono text-[9px] font-medium text-white ring-2 ring-white shadow-md"
      title={WORKFLOW_LEAD.name}
    >
      {WORKFLOW_LEAD.initials}
    </motion.span>
  )
}
