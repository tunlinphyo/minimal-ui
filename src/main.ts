import './style.css'

import './assets/polyfills/dialog'
import './assets/polyfills/toggle'

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
      }
    })

    if (newState === 'closed') {
      window.resetToggleInert('aboutme')
    }
  })
}

document.addEventListener('DOMContentLoaded', setupContactFocus)
