import { describe, expect, it, vi } from 'vitest'
import { setupFocusHandler } from '../../src/assets/scripts/focus'

describe('setupFocusHandler', () => {
  it('focuses the open-about-me button on open and restores focus to the trigger on close', () => {
    document.body.innerHTML = `
      <button id="toggle" type="button">Toggle theme</button>
      <button type="button" popovertarget="contact">Open contact</button>
      <section id="contact">
        <button type="button" class="open-about-me">Get to Know Me</button>
      </section>
    `

    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback: FrameRequestCallback) => {
      callback(0)
      return 1
    })
    const resetToggleInert = vi.fn<(id: string) => void>()
    Object.defineProperty(window, 'resetToggleInert', {
      value: resetToggleInert,
      configurable: true,
      writable: true,
    })

    setupFocusHandler()

    const contact = document.querySelector<HTMLElement>('#contact')
    const whatIDo = document.querySelector<HTMLElement>('.open-about-me')
    const contactTrigger = document.querySelector<HTMLElement>('[popovertarget="contact"]')

    const openEvent = new Event('beforetoggle') as Event & { newState: string }
    openEvent.newState = 'open'
    contact?.dispatchEvent(openEvent)

    expect(document.activeElement).toBe(whatIDo)

    const closeEvent = new Event('beforetoggle') as Event & { newState: string }
    closeEvent.newState = 'closed'
    contact?.dispatchEvent(closeEvent)

    expect(document.activeElement).toBe(contactTrigger)
    expect(resetToggleInert).toHaveBeenCalledWith('aboutme')
  })

  it('closes the contact popover when the theme toggle receives focus', () => {
    document.body.innerHTML = `
      <button id="toggle" type="button">Toggle theme</button>
      <button type="button" popovertarget="contact">Open contact</button>
      <section id="contact">
        <button type="button" class="open-about-me">Get to Know Me</button>
      </section>
    `

    const hidePopover = vi.fn()

    setupFocusHandler()

    const contact = document.querySelector<HTMLElement>('#contact') as HTMLElement & {
      hidePopover?: () => void
    }
    const themeToggleButton = document.getElementById('toggle')

    contact.hidePopover = hidePopover
    vi.spyOn(contact, 'matches').mockImplementation((selector: string) => selector === ':popover-open')

    themeToggleButton?.focus()

    expect(hidePopover).toHaveBeenCalledTimes(1)
  })
})
