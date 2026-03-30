# Minimal UI

Minimal UI is a portfolio website for muself built with Vite and TypeScript. The main idea of this project is to create an interactive interface with very little JavaScript and let modern CSS handle most of the presentation, layout, and motion.

## Project Approach

This project is intentionally simple in structure and focused on browser-native features.

- Uses system colors like `Canvas`, `CanvasText`, `Highlight`, `HighlightText`, and `GrayText` instead of a custom color palette.
- Keeps JavaScript minimal and only uses it for small behavior and focus management.
- Uses CSS as the primary tool for styling, transitions, layout, and component states.
- Prefers built-in platform features before adding extra libraries.

## CSS-First Design

Most of the UI behavior is driven by modern CSS features. The project uses several newer CSS capabilities to keep the codebase lightweight and expressive.

- `popover` and `dialog` based UI patterns
- anchor positioning in supported areas
- `:has()` for parent-aware styling
- `light-dark()` and `color-mix()` for adaptive color treatment
- `@starting-style` for entry transitions
- `corner-shape: squircle`
- `initial-letter`

The result is a UI that feels modern while still staying minimal.

## Minimal JavaScript

JavaScript is only used where CSS or HTML alone is not enough.

- small focus-management logic in `src/main.ts`
- lightweight polyfills for `dialog` and `toggle`

This keeps the project easy to read, easy to maintain, and close to the platform.

## Stack

- Vite
- TypeScript
- CSS
- Vitest
- Playwright

## Goal

The goal of this project is to explore how far a modern interface can go by relying on native HTML, minimal JavaScript, and new CSS features instead of heavy frameworks or complex runtime logic.
