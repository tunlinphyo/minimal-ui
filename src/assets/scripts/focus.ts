export function setupFocusHandler() {
  const contact = document.querySelector<HTMLElement>('#contact')
  const whatIDo = document.querySelector<HTMLElement>('.open-about-me')
  const contactTrigger = document.querySelector<HTMLElement>('[popovertarget="contact"]')
  const themeToggleButton = document.querySelector<HTMLElement>('#toggle')

  themeToggleButton?.addEventListener('focus', () => {
    if (contact?.matches(':popover-open')) {
      ;(contact as HTMLElement & { hidePopover?: () => void }).hidePopover?.()
    }
  })

  contact?.addEventListener('beforetoggle', ({ newState }) => {
    requestAnimationFrame(() => {
      if (newState === 'open') {
        whatIDo?.focus()
      } else {
        if (document.activeElement !== themeToggleButton) {
          contactTrigger?.focus()
        }

        window.resetToggleInert('aboutme')
      }
    })
  })
}