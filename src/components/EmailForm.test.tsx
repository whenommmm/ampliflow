import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EmailForm } from './EmailForm'

describe('EmailForm', () => {
  let openSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    openSpy = vi.spyOn(window, 'open').mockImplementation(() => ({ opener: window }) as unknown as Window)
    window.history.replaceState(null, '', '/')
  })
  afterEach(() => openSpy.mockRestore())

  it('rejects an invalid email without leaving the page', async () => {
    render(<EmailForm source="hero" />)
    await userEvent.type(screen.getByLabelText('Work email'), 'not-an-email')
    await userEvent.click(screen.getByRole('button', { name: 'Get 7 days free' }))
    expect(screen.getByRole('alert')).toHaveTextContent('Please enter a valid work email.')
    expect(openSpy).not.toHaveBeenCalled()
    expect(screen.getByLabelText('Work email')).toHaveFocus()
  })

  it('opens sign-up with the email attached, in the same click', async () => {
    render(<EmailForm source="hero" />)
    await userEvent.type(screen.getByLabelText('Work email'), 'you@company.com')
    await userEvent.click(screen.getByRole('button', { name: 'Get 7 days free' }))
    expect(openSpy).toHaveBeenCalledWith('https://app.ampliflow.in/sign-up?email=you%40company.com', '_blank')
    const opened = openSpy.mock.results[0].value as { opener: unknown }
    expect(opened.opener).toBeNull()
  })

  it('only claims what actually happened', async () => {
    render(<EmailForm source="hero" />)
    await userEvent.type(screen.getByLabelText('Work email'), 'you@company.com')
    await userEvent.click(screen.getByRole('button', { name: 'Get 7 days free' }))
    const status = await screen.findByRole('status', {}, { timeout: 2000 })
    expect(status).toHaveTextContent('Sign-up opened in a new tab.')
    expect(status).not.toHaveTextContent(/saved|filled in/i)
  })

  it('says so when a pop-up blocker stops the new tab', async () => {
    openSpy.mockImplementation(() => null)
    render(<EmailForm source="hero" />)
    await userEvent.type(screen.getByLabelText('Work email'), 'you@company.com')
    await userEvent.click(screen.getByRole('button', { name: 'Get 7 days free' }))
    const status = await screen.findByRole('status', {}, { timeout: 2000 })
    expect(status).toHaveTextContent('Your browser blocked the new tab.')
  })

  it('keeps a fallback link in case a pop-up blocker stops the new tab', async () => {
    render(<EmailForm source="closing" />)
    await userEvent.type(screen.getByLabelText('Work email'), 'you@company.com')
    await userEvent.click(screen.getByRole('button', { name: 'Get 7 days free' }))
    expect(await screen.findByRole('link', { name: /continue to sign-up/i }, { timeout: 2000 })).toHaveAttribute(
      'href',
      'https://app.ampliflow.in/sign-up?email=you%40company.com',
    )
  })

  it('carries a valid referral code from the page URL', async () => {
    window.history.replaceState(null, '', '/?ref=abc123')
    render(<EmailForm source="hero" />)
    await userEvent.type(screen.getByLabelText('Work email'), 'you@company.com')
    await userEvent.click(screen.getByRole('button', { name: 'Get 7 days free' }))
    expect(openSpy).toHaveBeenCalledWith('https://app.ampliflow.in/sign-up?email=you%40company.com&ref=abc123', '_blank')
  })
})
