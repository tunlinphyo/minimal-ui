/// <reference types="node" />

import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('testimonial people groups', () => {
  const indexHtml = readFileSync('index.html', 'utf8')
  const page = new DOMParser().parseFromString(indexHtml, 'text/html')

  it('keeps each trigger popover target aligned with its matching popover and image', () => {
    const groups = Array.from(page.querySelectorAll<HTMLElement>('.people-group'))

    expect(groups.length).toBeGreaterThan(0)

    for (const group of groups) {
      const trigger = group.querySelector<HTMLButtonElement>('button.person[popovertarget]')
      const popover = group.querySelector<HTMLElement>('.message[popover][id]')
      const triggerImage = trigger?.querySelector<HTMLImageElement>('img')
      const popoverImage = popover?.querySelector<HTMLImageElement>('.avatar img')

      expect(trigger).not.toBeNull()
      expect(popover).not.toBeNull()
      expect(triggerImage).not.toBeNull()
      expect(popoverImage).not.toBeNull()

      expect(trigger?.getAttribute('popovertarget')).toBe(popover?.id)
      expect(triggerImage?.getAttribute('src')).toBe(popoverImage?.getAttribute('src'))
    }
  })

  it('matches --count to the number of people groups and keeps button --index values sequential', () => {
    const center = page.querySelector<HTMLElement>('.people-center')
    const groups = Array.from(page.querySelectorAll<HTMLElement>('.people-group'))
    const buttons = groups.map((group) => group.querySelector<HTMLButtonElement>('button.person'))

    expect(center).not.toBeNull()
    expect(buttons.every(Boolean)).toBe(true)

    const count = Number(center?.style.getPropertyValue('--count').trim())
    const indexes = buttons.map((button) => Number(button?.style.getPropertyValue('--index').trim()))

    expect(count).toBe(groups.length)
    expect(indexes).toEqual(groups.map((_, index) => index + 1))
  })
})
