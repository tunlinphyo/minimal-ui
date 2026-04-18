import './style.css'

import './assets/polyfills/dialog'
import './assets/polyfills/toggle'
import './assets/elements/sunmoon'

import { themeToggleHandler } from './assets/scripts/theme'
import { setupFocusHandler } from './assets/scripts/focus'

document.addEventListener('DOMContentLoaded', () => {
  themeToggleHandler()
  setupFocusHandler()
})
