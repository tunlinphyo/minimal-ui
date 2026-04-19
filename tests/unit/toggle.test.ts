import { beforeAll, describe, expect, it, vi } from 'vitest'
import { togglePolyfill } from '../../src/assets/polyfills/toggle-polyfill'

function dispatchToggleCommand(target: HTMLElement, source: HTMLElement) {
  const event = new Event('command', {
    bubbles: true,
    cancelable: true,
  }) as Event & { command: string; source: HTMLElement }

  Object.defineProperties(event, {
    command: { value: '--toggle' },
    source: { value: source },
  })

  target.dispatchEvent(event)
}

describe('togglePolyfill', () => {
  beforeAll(() => {
    vi.stubGlobal('CSS', {
      escape: (value: string) => value
    })
  })

  it('toggles targets, manages inert, and restores focus on close', () => {
    document.body.innerHTML = `
      <button type="button" commandfor="contact" command="--toggle">Open</button>
      <div id="contact" toggle="auto-close" inert>
        <button type="button" commandfor="contact" command="--toggle">Close</button>
      </div>
    `

    togglePolyfill()

    const trigger = document.querySelector<HTMLElement>('[commandfor="contact"][command="--toggle"]')
    const target = document.getElementById('contact')
    const closeTrigger = target?.querySelector<HTMLElement>('[commandfor="contact"][command="--toggle"]')

    expect(trigger).not.toBeNull()
    expect(target).not.toBeNull()
    expect(closeTrigger).not.toBeNull()
    expect(target?.hasAttribute('inert')).toBe(true)

    dispatchToggleCommand(target!, trigger!)
    expect(target?.hasAttribute('inert')).toBe(false)
    expect(document.activeElement).toBe(closeTrigger)

    dispatchToggleCommand(target!, closeTrigger!)
    expect(target?.hasAttribute('inert')).toBe(true)
    expect(document.activeElement).toBe(trigger)
  })
})
