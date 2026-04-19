const CLOSE_ATTR = 'data-closing'
const CLOSE_MS = 500

export function dialogCloseHandler() {
  const dialog = document.getElementById('testimonial') as HTMLDialogElement | null

  dialog?.addEventListener('command', (event: Event) => {
    const commandEvent = event as CommandEvent
    if (commandEvent.command !== 'close') return

    event.preventDefault()
    closeWithAnimation(dialog)
  })

  dialog?.addEventListener('cancel', (event: Event) => {
    event.preventDefault()
    closeWithAnimation(dialog)
  })
}


function closeWithAnimation(dlg: HTMLDialogElement) {
  if (!dlg.open) return
  if (dlg.hasAttribute(CLOSE_ATTR)) return

  dlg.setAttribute(CLOSE_ATTR, '')

  const done = () => {
    cleanup()
    dlg.removeAttribute(CLOSE_ATTR)
    if (dlg.open) dlg.close()
  }

  const onEnd = (e: Event) => {
    if (e.target !== dlg) return
    done()
  }

  const cleanup = () => {
    dlg.removeEventListener('transitionend', onEnd)
    clearTimeout(timer)
  }

  dlg.addEventListener('transitionend', onEnd, { passive: true })

  const timer = window.setTimeout(done, CLOSE_MS + 80)
}
