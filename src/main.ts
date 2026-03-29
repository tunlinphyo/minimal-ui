import './style.css'

import './assets/polyfills/dialog'
import './assets/polyfills/toggle'

export function setupContactFocus() {
  const contact = document.querySelector<HTMLElement>('#contact')
  const aboutMe = document.querySelector<HTMLElement>('.about-me')
  const whatIDo = document.querySelector<HTMLElement>('.what-i-do')
  const contactTrigger = document.querySelector<HTMLElement>('[popovertarget="contact"]')

  contact?.addEventListener('beforetoggle', ({ newState }) => {
    requestAnimationFrame(() => {
      if (newState === 'open') {
        whatIDo?.focus()
      } else {
        contactTrigger?.focus()
      }
    })

    if (newState === 'closed' && aboutMe && !aboutMe.hasAttribute('inert')) {
      aboutMe.removeAttribute('data-toggle')
      aboutMe.setAttribute('inert', '')
    }
  })
}

document.addEventListener('DOMContentLoaded', setupContactFocus)
