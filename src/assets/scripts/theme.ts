import { SunMoon } from '../elements/sunmoon'

export function themeToggleHandler() {
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