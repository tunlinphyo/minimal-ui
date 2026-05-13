import { LitElement, html, css, type CSSResultGroup } from 'lit'

export class AboutContact extends LitElement {
  // protected createRenderRoot() {
  //   return this
  // }

  static styles?: CSSResultGroup | undefined = css`
    :host {
      --width: min(90vw, 21rem);
      width: var(--width);
      overflow: clip;
    }

    .tunlinphyo {
      position: absolute;
      z-index: -1;
      inset: 0;

      display: flex;
      justify-content: center;
      align-items: flex-end;
    }

    .tunlinphyo img {
      display: grid;
      width: auto;
      height: 85%;
      translate: 0 0.5rem;
    }

    :host(:popover-open) .tunlinphyo {
      animation: avatar-in 0.5s var(--ease-spring-1);
    }

    @media (hover: hover) and (pointer: fine) {
      :host(:popover-open) {
        &:focus-visible {
          outline: 2px solid var(--accent-color);
          outline-offset: 4px;
          animation: AnimateOutline4 .2s ease;
        }
      }
    }

    @keyframes avatar-in {
      from {
        translate: 0 100%;
      }
    }
  `

  protected render() {
    return html`
      <div class="tunlinphyo" aria-hidden="true" role="presentation">
        <img src="/tunlinphyo.png" fetchpriority="low" alt="">
      </div>

      <slot name="contact"></slot>
      <slot name="about"></slot>
      <!-- <contact-card data-inert-aboutme></contact-card>
      <about-me id="aboutme" toggle inert role="region" aria-labelledby="aboutme-title"></about-me> -->
    `
  }
}

if (!customElements.get('about-contact')) {
  customElements.define('about-contact', AboutContact)
}
