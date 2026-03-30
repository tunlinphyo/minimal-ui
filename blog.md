# Building a Minimal UI with System Colors, Modern CSS, and Very Little JavaScript

I built this project as a small personal portfolio website with one clear constraint: keep the interface rich, but keep the runtime light.

Instead of reaching for a large UI framework or a heavy component library, I wanted to see how far I could go with native HTML, modern CSS, and just enough JavaScript to handle behavior that CSS cannot manage alone. The result is a UI that feels interactive and expressive, but stays small and readable.

## Why I Built It This Way

The main idea behind this project is simple:

- use system colors instead of a custom palette
- rely on browser-native primitives like `popover` and `dialog`
- use new CSS features for layout, motion, and state
- keep JavaScript focused on accessibility and tiny behavior glue

This approach keeps the project close to the platform. It also makes the code easier to maintain because most of the complexity lives in CSS rather than in application state or custom UI logic.

## Using System Colors Instead of a Custom Palette

One of the most intentional decisions in this project was using system colors such as `Canvas`, `CanvasText`, `Highlight`, and `HighlightText`.

That choice means the interface can inherit a visual language that already fits the user’s environment. It also reduces design overhead because I do not need to maintain a large theme object or color token system for a small site.

This example from the project shows that approach directly:

```css
:where(.about-me) {
  background-color: Canvas;
  background-image: linear-gradient(Highlight, Highlight);
  color: HighlightText;
}
```

This pattern also avoids a Safari rendering issue with system colors. A transparent `Highlight` layer can let the background underneath `.about-me` show through, which is not the effect I want here. Using `Canvas` as the solid base with `Highlight` painted as a separate `background-image` layer keeps the accent treatment reliable while still matching the user’s system theme.

I also use CSS color functions to soften surfaces while still staying inside the system color model:

```css
:where([popover]) {
  border: 2px solid color-mix(in oklab, Highlight, transparent 50%);
  background-image: linear-gradient(
    to bottom,
    color-mix(in oklab, Highlight, transparent 85%),
    color-mix(in oklab, Highlight, transparent 50%)
  );
}
```

That gives the popovers more depth without moving away from the minimal idea.

## Letting Modern CSS Do Most of the Work

The project is mostly driven by CSS. I use CSS not only for styling, but also for transitions, interaction states, and some layout relationships.

For example, the contact popover uses native popover behavior plus CSS transitions and `@starting-style` for entry animation:

```css
:where(.contact) {
  opacity: 0;
  scale: 0;
  translate: 0 -1rem;
  transform-origin: 50% 10%;
  transition: scale .6s var(--ease-spring-2), opacity .2s ease;

  &:popover-open {
    opacity: 1;
    scale: 1;
    transition:
      opacity 0.7s var(--ease-spring-2),
      scale 0.7s var(--ease-spring-2);

    @starting-style {
      opacity: 0;
      scale: 0;
    }
  }
}
```

I also use CSS anchor positioning for smaller interaction details that would otherwise need JavaScript measurement.

One example is the moving `.blob` background behind the contact links. The hovered or focused link, and the "Get to Know Me" button, expose an anchor name. The `.blob` element then uses `position-anchor` to snap itself to that target:

```css
:where(.contact-card .contact-list a:is(:hover, :focus-visible)) {
  anchor-name: --contact;
}

:where(.open-about-me) {
  anchor-name: --contact;
}

:where(.blob) {
  position-anchor: --contact;
  position: absolute;
  top: anchor(top);
  left: anchor(left);
  right: anchor(right);
  bottom: anchor(bottom);
  transition: all .7s var(--ease-spring-3);
}
```

That gives the links and button a shared animated highlight surface without calculating bounds in JavaScript.

I use the same idea for the about panel. The `.about-me` element is absolutely positioned against an `--about` anchor, and the anchor source changes with state. When the panel is closed, it is anchored to the button area. When it opens, the anchor shifts so the same element expands into the full popover view:

```css
:where(.about-me) {
  position-anchor: --about;
  position: absolute;
  top: anchor(top);
  left: anchor(left);
  right: anchor(right);
  bottom: anchor(bottom);
}

:where(.contact:has(.about-me[inert])) {
  .button-container {
    anchor-name: --about;
  }
}

:where(.contact:has(.about-me:not([inert]))) {
  .button-container {
    anchor-name: none;
  }

  .about-me {
    transition: all .6s var(--ease-spring-2), opacity .1s ease;
  }
}
```

That creates a smooth transition between the compact button state and the full expanded panel while keeping the implementation declarative.

I also use newer CSS features across the codebase, including:

- `:has()` for state-based parent styling
- `color-mix()` and `light-dark()` for color treatment
- `corner-shape: squircle` for softer component edges
- `initial-letter` for typography details
- anchor positioning where it makes sense and where support is practical

This keeps the UI expressive without introducing a lot of JavaScript-driven rendering logic.

## Keeping JavaScript Small and Focused

I still use JavaScript, but only where it adds real value.

The main runtime code handles focus management for accessibility. When the contact popover opens, focus moves to the "Get to know more about Tun Lin Phyo" button. When it closes, focus returns to the original trigger. That behavior is small, but important.

Here is the core logic from `src/main.ts`:

```ts
export function setupContactFocus() {
  const contact = document.querySelector<HTMLElement>('#contact')
  const aboutMe = document.querySelector<HTMLElement>('.about-me')
  const whatIDo = document.querySelector<HTMLElement>('.open-about-me')
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
```

That is the kind of JavaScript I want in a project like this: small, direct, and tied to accessibility or browser behavior instead of trying to replace what CSS and HTML already do well.

I also added lightweight polyfills for `dialog` and `toggle` so the interface remains usable even when support is incomplete.

## Building UI with Native HTML Features

Another goal of this project was to use native browser features as much as possible.

The markup uses:

- `popover` for the contact surface and testimonial messages
- `dialog` for the testimonials modal
- semantic buttons and links
- ARIA labels and region labeling for better accessibility

This helps keep the structure straightforward. Instead of building custom overlay systems from scratch, I can focus on styling and interaction polish.

## Testing the Minimal Approach

Even though the project is small, I still wanted confidence that the important interactions work correctly. That is why the project includes both unit tests and end-to-end tests.

### Unit Testing with Vitest

The unit tests focus on behavior that is easy to break, especially the JavaScript that manages focus and state transitions.

This test verifies that opening the contact popover moves focus correctly, and closing it restores focus and resets the about section state:

```ts
it('focuses the open-about-me button on open and restores focus to the trigger on close', () => {
  document.body.innerHTML = `
    <button type="button" popovertarget="contact">Open contact</button>
    <section id="contact">
      <button type="button" class="open-about-me">Get to Know Me</button>
    </section>
    <div class="about-me" data-toggle></div>
  `

  vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback: FrameRequestCallback) => {
    callback(0)
    return 1
  })

  setupContactFocus()

  const contact = document.querySelector<HTMLElement>('#contact')
  const whatIDo = document.querySelector<HTMLElement>('.open-about-me')
  const contactTrigger = document.querySelector<HTMLElement>('[popovertarget="contact"]')
  const aboutMe = document.querySelector<HTMLElement>('.about-me')

  const openEvent = new Event('beforetoggle') as Event & { newState: string }
  openEvent.newState = 'open'
  contact?.dispatchEvent(openEvent)

  expect(document.activeElement).toBe(whatIDo)

  const closeEvent = new Event('beforetoggle') as Event & { newState: string }
  closeEvent.newState = 'closed'
  contact?.dispatchEvent(closeEvent)

  expect(document.activeElement).toBe(contactTrigger)
  expect(aboutMe?.hasAttribute('data-toggle')).toBe(false)
  expect(aboutMe?.hasAttribute('inert')).toBe(true)
})
```

There are also unit tests for the dialog polyfill, toggle behavior, contact interactions, and testimonials behavior. For a project with minimal JavaScript, this gives enough safety without turning the test suite into a maintenance burden.

### End-to-End Testing with Playwright

Unit tests are useful, but they do not replace real browser interaction checks. I also use Playwright to test the actual user flow.

For example, this end-to-end test opens the contact popover, verifies that the key links are visible, and checks that focus returns to the trigger after closing:

```ts
test('opens the contact popover and shows the contact links', async ({ page }) => {
  await page.goto('/')

  const trigger = page.getByRole('button', { name: "Open Tun`s contact list" })
  const contact = page.locator('#contact')
  const whatIDo = contact.getByRole('button', { name: 'Get to know more about Tun Lin Phyo' })

  await expect(contact).not.toBeVisible()

  await trigger.click()

  await expect(contact).toBeVisible()
  await expect(whatIDo).toBeFocused()
  await expect(contact.getByRole('link', { name: "Visit Tun's GitHub profile" })).toBeVisible()

  await page.keyboard.press('Escape')

  await expect(contact).not.toBeVisible()
  await expect(trigger).toBeFocused()
})
```

This matches how the site is actually used. For UI work, that kind of test is valuable because it catches problems that unit tests can miss, especially around focus, visibility, and browser-controlled components like popovers and dialogs.

## What I Like About This Project

What I like most about this project is that it stays disciplined.

It does not try to solve everything with JavaScript. It does not invent a complicated design system for a small site. It does not depend on a large runtime just to animate a card or open a panel.

Instead, it uses the platform directly:

- system colors for a clean and adaptive visual base
- modern CSS for interaction and layout
- native HTML features for overlays and dialogs
- minimal JavaScript for focus and behavior glue
- tests for the most important interactions

That balance is what makes the project interesting to me.

## Closing Thoughts

This project is a small experiment in building a polished interface with less code and more trust in the web platform.

I wanted the site to feel modern without becoming heavy. I wanted the code to stay readable. I wanted the interaction model to be strong without introducing a lot of moving parts. Using system colors, modern CSS, minimal JavaScript, and a focused testing setup helped me get there.

For me, this project is not just a portfolio site. It is also a reminder that good frontend work does not always need more abstractions. Sometimes it just needs better use of the platform we already have.
