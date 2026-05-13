const lastFocusedTrigger = new WeakMap<HTMLElement, HTMLElement>()
const processedEvents = new WeakSet<Event>()
const listeningRoots = new WeakSet<Document | ShadowRoot>()
let isAttachShadowPatched = false
const FIRST_FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([type="hidden"]):not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export function togglePolyfill() {
  setupToggleListeners(document)
  setupShadowRootListeners(document)
  patchAttachShadow()
}

function handleToggleActivation(event: Event) {
  if (processedEvents.has(event)) return

  processedEvents.add(event)

  if (event.defaultPrevented) return
  if (event.type !== 'command') return

  const commandEvent = event as CommandEvent
  if (commandEvent.command !== '--toggle') return

  const trigger = getToggleTrigger(commandEvent)
  if (!trigger) return

  const target = getToggleTarget(event)
  if (!target) return

  const isOpening = target.hasAttribute('inert')

  target.toggleAttribute('inert', !isOpening)
  syncInert(target)

  if (isOpening) {
    lastFocusedTrigger.set(target, trigger)
    focusFirstFocusableElement(target)
    return
  }

  lastFocusedTrigger.get(target)?.focus()
}

function getToggleTrigger(event: CommandEvent) {
  return event.source instanceof HTMLElement ? event.source : null
}

function getToggleTarget(event: Event) {
  return event.target instanceof HTMLElement ? event.target : null
}

function focusFirstFocusableElement(target: HTMLElement) {
  target.querySelector<HTMLElement>(FIRST_FOCUSABLE_SELECTOR)?.focus()
}

function getLinkedElements(root: Document | ShadowRoot, id: string) {
  return root.querySelectorAll<HTMLElement>(`[data-inert-${CSS.escape(id)}]`)
}

function syncInert(target: HTMLElement) {
  const isOpen = !target.hasAttribute('inert')

  if (!target.id) return

  const root = target.getRootNode()
  if (!(root instanceof Document || root instanceof ShadowRoot)) return

  for (const linkedElement of getLinkedElements(root, target.id)) {
    linkedElement.toggleAttribute('inert', isOpen)
  }
}

function setupToggleListeners(target: Document | ShadowRoot) {
  if (listeningRoots.has(target)) return

  listeningRoots.add(target)
  target.addEventListener('command', handleToggleActivation, true)
}

function setupShadowRootListeners(root: Document | ShadowRoot) {
  for (const element of root.querySelectorAll<HTMLElement>('*')) {
    if (!element.shadowRoot) continue

    setupToggleListeners(element.shadowRoot)
    setupShadowRootListeners(element.shadowRoot)
  }
}

function patchAttachShadow() {
  if (isAttachShadowPatched) return

  isAttachShadowPatched = true
  const attachShadow = Element.prototype.attachShadow

  Element.prototype.attachShadow = function attachShadowWithTogglePolyfill(init) {
    const shadowRoot = attachShadow.call(this, init)
    setupToggleListeners(shadowRoot)
    return shadowRoot
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

  target.setAttribute('inert', '')

  for (const linkedElement of getLinkedElements(document, id)) {
    linkedElement.removeAttribute('inert')
  }
}

document.addEventListener('DOMContentLoaded', togglePolyfill)
