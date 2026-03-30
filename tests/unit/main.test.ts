import { describe, expect, it, vi } from 'vitest'
import { setupContactFocus } from '../../src/main'

describe('contact popover focus management', () => {
  it('focuses the open-about-me button on open and restores focus to the trigger on close', () => {
    document.body.innerHTML = `
      <button type="button" popovertarget="contact">Open contact</button>
      <section id="contact">
        <button type="button" class="open-about-me">Get to Know Me</button>
      </section>
      <div class="about-me" data-toggle></div>
    `

    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback: FrameRequestCallback) => {
      callback(0)
      return 1
    })

    setupContactFocus()

    const contact = document.querySelector<HTMLElement>('#contact')
    const whatIDo = document.querySelector<HTMLElement>('.open-about-me')
    const contactTrigger = document.querySelector<HTMLElement>('[popovertarget="contact"]')
    const aboutMe = document.querySelector<HTMLElement>('.about-me')

    const openEvent = new Event('beforetoggle') as Event & { newState: string }
    openEvent.newState = 'open'
    contact?.dispatchEvent(openEvent)

    expect(document.activeElement).toBe(whatIDo)

    const closeEvent = new Event('beforetoggle') as Event & { newState: string }
    closeEvent.newState = 'closed'
    contact?.dispatchEvent(closeEvent)

    expect(document.activeElement).toBe(contactTrigger)
    expect(aboutMe?.hasAttribute('data-toggle')).toBe(false)
    expect(aboutMe?.hasAttribute('inert')).toBe(true)
  })
})
