import { expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { WorkflowDemo } from './WorkflowDemo'

it('lets a visitor click a step to jump the lead there', async () => {
  render(<WorkflowDemo active={false} reduce={false} />)
  const invite = screen.getByRole('button', { name: /send an invite/i })
  await userEvent.click(invite)
  expect(invite).toHaveAttribute('aria-current', 'step')
  expect(screen.getByRole('button', { name: /campaign start/i })).not.toHaveAttribute('aria-current')
})
