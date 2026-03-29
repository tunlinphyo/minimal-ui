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
    elem.toggleAttribute('inert', !elem.hasAttribute('data-toggle'))
  }
}

document.addEventListener('DOMContentLoaded', togglePolyfill)
