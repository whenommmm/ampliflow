import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { PauseCircle, Send } from 'lucide-react'
import { INBOX_THREADS, OUTBOUND_MESSAGE, type InboxStatus } from '@/content/demo'
import { Avatar } from '@/components/ui'
import { cn } from '@/lib/cn'

const ARRIVAL = [...INBOX_THREADS].reverse().map((t) => t.id) // oldest first
const START = 2
const STATUSES: Exclude<InboxStatus, null>[] = ['Interested', 'Booked', 'Done']
type Filter = 'all' | 'needs' | 'interested'

function ago(min: number) {
  return min < 60 ? `${min}m` : `${Math.round(min / 60)}h`
}

function outbound(name: string) {
  const first = name.split(' ')[0]
  return first === 'Rohan' ? OUTBOUND_MESSAGE : `Hey ${first}, thanks for connecting. Mind if I share how teams like yours fill pipeline without adding headcount?`
}

export function InboxDemo({ active, reduce }: { active: boolean; reduce: boolean }) {
  const [arrived, setArrived] = useState(reduce ? ARRIVAL.length : START)
  const [filter, setFilter] = useState<Filter>('all')
  const [picked, setPicked] = useState<string | null>(null)
  const [statuses, setStatuses] = useState<Record<string, InboxStatus>>(() => Object.fromEntries(INBOX_THREADS.map((t) => [t.id, t.status])))

  useEffect(() => {
    if (reduce || !active || arrived >= ARRIVAL.length) return
    const id = window.setTimeout(() => setArrived((a) => a + 1), arrived === START ? 700 : 1500)
    return () => window.clearTimeout(id)
  }, [active, arrived, reduce])

  useEffect(() => {
    if (!active && !reduce) {
      setArrived(START)
      setPicked(null)
    }
  }, [active, reduce])

  const visible = useMemo(() => INBOX_THREADS.filter((t) => ARRIVAL.indexOf(t.id) < arrived), [arrived])
  const needs = visible.filter((t) => statuses[t.id] === null)
  const interested = visible.filter((t) => statuses[t.id] === 'Interested')
  const list = filter === 'all' ? visible : filter === 'needs' ? needs : interested
  const newestId = ARRIVAL[arrived - 1]
  const selected = visible.find((t) => t.id === (picked ?? newestId)) ?? visible[0]

  return (
    <div className="grid h-full min-h-0 gap-3 md:grid-cols-[280px_1fr]">
      <div className="flex min-h-0 flex-col rounded-lg border border-line-lo bg-white">
        <div className="flex gap-1 border-b border-line-lo p-2" role="group" aria-label="Filter conversations">
          <FilterChip on={filter === 'all'} onClick={() => setFilter('all')} label="All" n={visible.length} />
          <FilterChip on={filter === 'needs'} onClick={() => setFilter('needs')} label="Needs reply" n={needs.length} />
          <FilterChip on={filter === 'interested'} onClick={() => setFilter('interested')} label="Interested" n={interested.length} />
        </div>
        <ul className="min-h-0 flex-1 overflow-hidden p-1.5">
          <AnimatePresence initial={false}>
            {list.slice(0, 5).map((t, i) => (
              <motion.li
                key={t.id}
                layout
                initial={{ opacity: 0, y: -16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                className={cn(i >= 3 && 'hidden md:block')}
              >
                <button
                  type="button"
                  onClick={() => setPicked(t.id)}
                  aria-pressed={selected?.id === t.id}
                  className={cn(
                    'flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left transition-colors',
                    selected?.id === t.id ? 'bg-primary-dim' : 'hover:bg-bg-1',
                  )}
                >
                  <Avatar initials={t.initials} />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5">
                      <span className="truncate text-[13px] font-semibold text-t1">{t.name}</span>
                      {t.id === newestId && !reduce && (
                        <span className="rounded bg-primary px-1 py-px font-mono text-[9px] uppercase tracking-wider text-white">new</span>
                      )}
                    </span>
                    <span className="block truncate text-[12px] text-t2">{t.reply}</span>
                  </span>
                  <span className="shrink-0 self-start font-mono text-[10px] text-t3">{ago(t.minutesAgo)}</span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
          {list.length === 0 && <li className="px-2 py-6 text-center text-[12px] text-t3">Nothing here yet.</li>}
        </ul>
      </div>

      {selected && (
        <div className="flex min-h-0 flex-col rounded-lg border border-line-lo bg-white">
          <div className="flex items-center gap-2.5 border-b border-line-lo px-3 py-2.5">
            <Avatar initials={selected.initials} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-t1">{selected.name}</p>
              <p className="truncate text-[11px] text-t3">{selected.role}</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 ring-1 ring-amber-200">
              <PauseCircle className="size-3" aria-hidden /> Auto-paused
            </span>
          </div>
          <div className="flex min-h-0 flex-1 flex-col justify-end gap-2 overflow-hidden bg-bg-1 p-3">
            <p className="ml-auto max-w-[85%] rounded-lg rounded-br-sm bg-primary px-3 py-2 text-[12.5px] leading-snug text-white">{outbound(selected.name)}</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={selected.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduce ? 0 : 0.25 }}
                className="max-w-[85%] rounded-lg rounded-bl-sm bg-white px-3 py-2 text-[12.5px] leading-snug text-t1 ring-1 ring-line"
              >
                {selected.reply}
              </motion.p>
            </AnimatePresence>
            <p className="text-center font-mono text-[10px] uppercase tracking-[0.12em] text-t3">Reply received · sequence paused for {selected.name.split(' ')[0]}</p>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 border-t border-line-lo p-2.5">
            {STATUSES.map((s) => (
              <motion.button
                key={s}
                type="button"
                whileTap={{ scale: 0.94 }}
                aria-pressed={statuses[selected.id] === s}
                onClick={() => setStatuses((m) => ({ ...m, [selected.id]: m[selected.id] === s ? null : s }))}
                className={cn(
                  'rounded-md px-2.5 py-1 text-[12px] font-medium ring-1 transition-colors',
                  statuses[selected.id] === s ? 'bg-primary text-white ring-primary' : 'bg-white text-t2 ring-line hover:text-t1',
                )}
              >
                {s}
              </motion.button>
            ))}
            <span className="ml-auto hidden items-center gap-1.5 text-[12px] text-t3 sm:inline-flex">
              <Send className="size-3.5" aria-hidden /> Reply without opening LinkedIn
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

function FilterChip({ on, onClick, label, n }: { on: boolean; onClick: () => void; label: string; n: number }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={cn('inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[12px] font-medium transition-colors', on ? 'bg-bg-2 text-t1' : 'text-t3 hover:text-t1')}
    >
      {label}
      <motion.span key={n} initial={{ scale: 1.4 }} animate={{ scale: 1 }} className="rounded bg-white px-1 font-mono text-[10px] text-t2 ring-1 ring-line">
        {n}
      </motion.span>
    </button>
  )
}
