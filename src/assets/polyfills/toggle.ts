export function togglePolyfill() {
  const triggers = document.querySelectorAll<HTMLElement>('[toogletarget]')
  const lastFocusedTrigger = new WeakMap<HTMLElement, HTMLElement>()

  for (const trigger of triggers) {
    trigger.addEventListener("click", handleClick)
  }

  function handleClick(event: Event) {
    const elem = event.target as HTMLElement
    const trigger = elem.closest<HTMLElement>('[toogletarget]')
    if (!trigger) return

    const id = trigger.getAttribute('toogletarget')
    const target = id ? (document.getElementById(id) as HTMLElement | null) : null
    if (!target) return

    const isOpening = !target.hasAttribute('data-toggle')

    target.toggleAttribute('data-toggle')
    syncInert(target)

    if (isOpening) {
      lastFocusedTrigger.set(target, trigger)

      const nestedTrigger = target.querySelector<HTMLElement>(`[toogletarget="${CSS.escape(id as string)}"]`)
      nestedTrigger?.focus()
      return
    }

    lastFocusedTrigger.get(target)?.focus()
  }

  function syncInert(elem: HTMLElement) {
    const isActive = elem.hasAttribute('data-toggle')
    elem.toggleAttribute('inert', !isActive)

    const id = elem.id
    if (!id) return

    const linkedElements = document.querySelectorAll<HTMLElement>(`[data-inert="${CSS.escape(id)}"]`)
    for (const linkedElement of linkedElements) {
      linkedElement.toggleAttribute('inert', isActive)
    }
  }
}

declare global {
  interface Window {
    resetToggleInert: (id: string) => void
  }
}

window.resetToggleInert = (id: string) => {
  const target = id ? (document.getElementById(id) as HTMLElement | null) : null
  if (!target) return
  if (target.hasAttribute('inert')) return

  target.removeAttribute('data-toggle')
  target.setAttribute('inert', '')

  const linkedElements = document.querySelectorAll<HTMLElement>(`[data-inert="${CSS.escape(id)}"]`)
  for (const linkedElement of linkedElements) {
    linkedElement.removeAttribute('inert')
  }
}

document.addEventListener('DOMContentLoaded', togglePolyfill)
