import { beforeAll, describe, expect, it, vi } from 'vitest'
import { togglePolyfill } from '../../src/assets/polyfills/toggle'

describe('togglePolyfill', () => {
  beforeAll(() => {
    vi.stubGlobal('CSS', {
      escape: (value: string) => value
    })
  })

  it('toggles targets, manages inert, and restores focus on close', () => {
    document.body.innerHTML = `
      <button type="button" toogletarget="contact">Open</button>
      <div id="contact" toggle="auto-close">
        <button type="button" toogletarget="contact">Close</button>
      </div>
    `

    togglePolyfill()

    const trigger = document.querySelector<HTMLElement>('[toogletarget="contact"]')
    const target = document.getElementById('contact')
    const closeTrigger = target?.querySelector<HTMLElement>('[toogletarget="contact"]')

    expect(trigger).not.toBeNull()
    expect(target).not.toBeNull()
    expect(closeTrigger).not.toBeNull()
    expect(target?.hasAttribute('data-toggle')).toBe(false)
    expect(target?.hasAttribute('inert')).toBe(false)

    trigger?.click()
    expect(target?.hasAttribute('data-toggle')).toBe(true)
    expect(target?.hasAttribute('inert')).toBe(false)
    expect(document.activeElement).toBe(closeTrigger)

    closeTrigger?.click()
    expect(target?.hasAttribute('data-toggle')).toBe(false)
    expect(target?.hasAttribute('inert')).toBe(true)
    expect(document.activeElement).toBe(trigger)
  })
})
