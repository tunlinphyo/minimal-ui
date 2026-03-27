import { describe, expect, it, vi } from 'vitest'

import { dialogPolyfill } from '../../src/assets/polyfills/dialog'

describe('dialogPolyfill', () => {
  it('opens dialogs from triggers and closes them after the animation timeout', () => {
    vi.useFakeTimers()

    document.body.innerHTML = `
      <button type="button" dialogtarget="testimonial">Open</button>
      <dialog id="testimonial">
        <button type="button" dialogclose>Close</button>
      </dialog>
    `

    dialogPolyfill()

    const trigger = document.querySelector<HTMLElement>('[dialogtarget="testimonial"]')
    const dialog = document.getElementById('testimonial') as HTMLDialogElement | null
    const closeButton = dialog?.querySelector<HTMLElement>('[dialogclose]')

    expect(trigger).not.toBeNull()
    expect(dialog).not.toBeNull()

    trigger?.click()
    expect(dialog?.open).toBe(true)

    closeButton?.click()
    expect(dialog?.hasAttribute('data-closing')).toBe(true)

    vi.advanceTimersByTime(600)

    expect(dialog?.open).toBe(false)
    expect(dialog?.hasAttribute('data-closing')).toBe(false)
  })
})
