import { describe, expect, it, } from 'vitest'
import { togglePolyfill } from '../../src/assets/polyfills/toggle'

describe('togglePolyfill', () => {
  it('toggles and auto-closes toggle targets', () => {
    document.body.innerHTML = `
      <button type="button" toogletarget="contact">Open</button>
      <div id="contact" toggle="auto-close"></div>
    `

    togglePolyfill()

    const trigger = document.querySelector<HTMLElement>('[toogletarget="contact"]')
    const target = document.getElementById('contact')

    expect(trigger).not.toBeNull()
    expect(target).not.toBeNull()
    expect(target?.hasAttribute('inert')).toBe(true)

    trigger?.click()
    expect(target?.hasAttribute('data-toggle')).toBe(true)
    expect(target?.hasAttribute('inert')).toBe(false)

    document.body.click()
    expect(target?.hasAttribute('data-toggle')).toBe(false)
    expect(target?.hasAttribute('inert')).toBe(true)
  })
})
