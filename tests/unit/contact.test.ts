/// <reference types="node" />

import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('contact links', () => {
  it('uses the expected external destinations and security attributes', () => {
    const indexHtml = readFileSync('index.html', 'utf8')
    const page = new DOMParser().parseFromString(indexHtml, 'text/html')

    const githubLink = page.querySelector<HTMLAnchorElement>('[aria-label="Visit Tun\'s GitHub profile"]')
    const linkedInLink = page.querySelector<HTMLAnchorElement>('[aria-label="Connect with Tun on LinkedIn"]')
    const emailLink = page.querySelector<HTMLAnchorElement>('[aria-label="Send email to Tun"]')

    expect(githubLink).not.toBeNull()
    expect(githubLink?.getAttribute('href')).toBe('https://github.com/tunlinphyo')
    expect(githubLink?.getAttribute('target')).toBe('_blank')
    expect(githubLink?.getAttribute('rel')).toBe('noopener noreferrer')

    expect(linkedInLink).not.toBeNull()
    expect(linkedInLink?.getAttribute('href')).toBe('https://www.linkedin.com/in/tunlinphyo')
    expect(linkedInLink?.getAttribute('target')).toBe('_blank')
    expect(linkedInLink?.getAttribute('rel')).toBe('noopener noreferrer')

    expect(emailLink).not.toBeNull()
    expect(emailLink?.getAttribute('href')).toBe('mailto:tunlinphyo.it@gmail.com')
    expect(emailLink?.getAttribute('target')).toBe('_blank')
    expect(emailLink?.getAttribute('rel')).toBe('noopener noreferrer')
  })
})
