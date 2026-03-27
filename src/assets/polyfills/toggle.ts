export function togglePolyfill() {
  const toggles = document.querySelectorAll<HTMLElement>('[toggle]')
  const triggers = document.querySelectorAll<HTMLElement>('[toogletarget]')

  for (const elem of toggles) {
    syncInert(elem)
  }

  document.addEventListener('click', handleClick, { passive: true, capture: true })

  function handleClick(event: Event) {
    const elem = event.target as HTMLElement
    const trigger = elem.closest<HTMLElement>('[toogletarget]')
    if (!trigger) return closeAll()

    const id = trigger.getAttribute('toogletarget')
    const target = id ? (document.getElementById(id) as HTMLElement | null) : null
    if (!target) return

    target.toggleAttribute('data-toggle')
    syncInert(target)
  }

  function closeAll() {
    for (const elem of triggers) {
      removeToggle(elem)
    }
  }

  function removeToggle(elem: HTMLElement) {
    const id = elem.getAttribute('toogletarget')
    const target = id ? (document.getElementById(id) as HTMLElement | null) : null
    if (!target) return

    const auto = target.getAttribute('toggle') === 'auto-close'
    if (auto) {
      target.removeAttribute('data-toggle')
      syncInert(target)
    }
  }

  function syncInert(elem: HTMLElement) {
    elem.toggleAttribute('inert', !elem.hasAttribute('data-toggle'))
  }
}

document.addEventListener('DOMContentLoaded', togglePolyfill)
