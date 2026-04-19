import './style.css'

import 'invokers-polyfill'
import './assets/polyfills/toggle-polyfill'
import './assets/elements/sunmoon'

import { themeToggleHandler } from './assets/scripts/theme'
import { setupFocusHandler } from './assets/scripts/focus'
import { dialogCloseHandler } from './assets/scripts/dialog'

document.addEventListener('DOMContentLoaded', () => {
  themeToggleHandler()
  setupFocusHandler()
  dialogCloseHandler()
})
