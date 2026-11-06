import { describe, expect, it } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Faq } from './Faq'
import { requestFaq } from '@/lib/faqStore'
import { faq } from '@/content/site'

describe('Faq', () => {
  it('lists all eight questions, collapsed', () => {
    render(<Faq />)
    const buttons = screen.getAllByRole('button', { expanded: false })
    expect(buttons.filter((b) => faq.some((f) => b.textContent?.includes(f.q)))).toHaveLength(8)
  })

  it('opens one answer at a time', async () => {
    render(<Faq />)
    const first = screen.getByRole('button', { name: new RegExp(faq[0].q.replace('?', '\\?')) })
    const second = screen.getByRole('button', { name: new RegExp(faq[1].q.replace('?', '\\?')) })
    await userEvent.click(first)
    expect(first).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText(/Safety is the reason we exist/)).toBeVisible()
    await userEvent.click(second)
    expect(first).toHaveAttribute('aria-expanded', 'false')
    expect(second).toHaveAttribute('aria-expanded', 'true')
  })

  it('opens a question when the redesign notes ask for it', () => {
    render(<Faq />)
    act(() => requestFaq(4))
    expect(screen.getByRole('button', { name: /Can I start using Ampliflow today\?/ })).toHaveAttribute('aria-expanded', 'true')
  })
})
