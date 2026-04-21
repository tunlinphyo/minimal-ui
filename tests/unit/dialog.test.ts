import { describe, expect, it, vi } from 'vitest'

import { dialogCloseHandler } from '../../src/assets/scripts/dialog'

describe('dialogCloseHandler', () => {
  it('closes the dialog after the close command animation timeout', () => {
    vi.useFakeTimers()

    document.body.innerHTML = `
      <dialog id="testimonial">
        <button type="button" commandfor="testimonial" command="close">Close</button>
      </dialog>
    `

    dialogCloseHandler()

    const dialog = document.getElementById('testimonial') as HTMLDialogElement | null
    const closeButton = dialog?.querySelector<HTMLElement>('[command="close"]')
    expect(dialog).not.toBeNull()

    dialog?.showModal()
    expect(dialog?.open).toBe(true)

    const closeEvent = new Event('command', {
      bubbles: true,
      cancelable: true,
    }) as Event & { command: string }
    closeEvent.command = 'close'

    closeButton?.dispatchEvent(closeEvent)

    expect(closeEvent.defaultPrevented).toBe(true)
    expect(dialog?.hasAttribute('data-closing')).toBe(true)

    vi.advanceTimersByTime(600)

    expect(dialog?.open).toBe(false)
    expect(dialog?.hasAttribute('data-closing')).toBe(false)
  })

  it('closes the dialog after a cancel event', () => {
    vi.useFakeTimers()

    document.body.innerHTML = `
      <dialog id="testimonial"></dialog>
    `

    dialogCloseHandler()

    const dialog = document.getElementById('testimonial') as HTMLDialogElement | null
    const cancelEvent = new Event('cancel', { cancelable: true })

    dialog?.showModal()
    dialog?.dispatchEvent(cancelEvent)

    expect(cancelEvent.defaultPrevented).toBe(true)
    expect(dialog?.hasAttribute('data-closing')).toBe(true)

    vi.advanceTimersByTime(600)

    expect(dialog?.open).toBe(false)
    expect(dialog?.hasAttribute('data-closing')).toBe(false)
  })
})
