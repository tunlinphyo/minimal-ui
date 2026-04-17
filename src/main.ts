import './style.css'

import './assets/polyfills/dialog'
import './assets/polyfills/toggle'
import './assets/elements/sunmoon'

import { SunMoon } from './assets/elements/sunmoon'

export function setupContactFocus() {
  const contact = document.querySelector<HTMLElement>('#contact')
  const whatIDo = document.querySelector<HTMLElement>('.open-about-me')
  const contactTrigger = document.querySelector<HTMLElement>('[popovertarget="contact"]')

  contact?.addEventListener('beforetoggle', ({ newState }) => {
    requestAnimationFrame(() => {
      if (newState === 'open') {
        whatIDo?.focus()
      } else {
        contactTrigger?.focus()
        window.resetToggleInert('aboutme')
      }
    })
  })
}

export function themeToggle() {
  const toggleButton = document.querySelector('#toggle') as HTMLButtonElement
  const sunMoon = document.querySelector('sun-moon') as SunMoon
  const colorScheme = window.matchMedia('(prefers-color-scheme: dark)')
  const root = document.documentElement

  const getTheme = () => {
    const colorSchemeValue = root.style.colorScheme.trim()

    if (colorSchemeValue === 'dark' || colorSchemeValue === 'light') {
      return colorSchemeValue
    }

    return colorScheme.matches ? 'dark' : 'light'
  }

  function syncSunMoonTheme() {
    const theme = getTheme()
    sunMoon.theme = theme
    document.body.setAttribute('togelling', '')
    document.body.addEventListener('animationend', () => {
      document.body.removeAttribute('togelling')
      document.body.setAttribute('theme', theme)
    })
  }

  const toggleTheme = () => {
    const nextTheme = getTheme() === 'dark' ? 'light' : 'dark'
    root.style.colorScheme = nextTheme
  }

  const updateThemeBySchama = () => {
    const nextTheme = colorScheme.matches ? 'dark' : 'light'
    root.style.colorScheme = nextTheme
  }

  syncSunMoonTheme()
  colorScheme.addEventListener('change', updateThemeBySchama)
  toggleButton.addEventListener('click', toggleTheme)

  new MutationObserver(syncSunMoonTheme).observe(root, {
    attributes: true,
    attributeFilter: ['style'],
  })
}

document.addEventListener('DOMContentLoaded', () => {
  setupContactFocus()
  themeToggle()
})
