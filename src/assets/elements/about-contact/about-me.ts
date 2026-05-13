import { LitElement, html } from 'lit'

export class AboutMe extends LitElement {
  protected createRenderRoot() {
    return this
  }

  protected render() {
    return html`
      <button class="circle-button about-close" type="button" commandfor="aboutme" command="--toggle" aria-label="Close about me panel">
        <svg aria-hidden="true" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
          <path fill="currentColor" d="M21 14L27 14L27 21L34 21L34 27L27 27L27 34L21 34L21 27L14 27L14 21L21 21ZM24 0A1 1 0 0 0 24 48A1 1 0 0 0 24 0Z"/>
        </svg>
      </button>
      <h3 id="aboutme-title">Hi, I'm Tun</h3>
      <p>
        A Frontend Engineer focused on clean design, smooth interactions, and
        building web experiences that feel simple and intuitive.
      </p>

      <ul class="recent-projects">
        <li>
          <a href="https://cody-draft.web.app/notebook/anchor.html" target="_blank" rel="noopener noreferrer">
            <span>Cody Draft</span>
            <svg width="18" height="18" viewBox="0 0 469.336 469.336">
              <g>
                <path fill="url(#linkGradient)" d="M459.95 137.237 331.971 9.089c-12.063-12.12-33.219-12.11-45.26-.01l-42.656 42.713c-6.052 6.039-9.385 14.091-9.385 22.665s3.333 16.626 9.375 22.655l127.99 128.159c6.031 6.06 14.073 9.398 22.635 9.398s16.604-3.338 22.625-9.387l42.656-42.713c6.052-6.039 9.385-14.092 9.385-22.665 0-8.575-3.334-16.628-9.386-22.667zM235.127 118.543c-3.5-3.51-8.938-4.135-13.115-1.552-31.146 19.094-79.938 41.854-135.521 41.854-4.76 0-8.948 3.156-10.26 7.74L.408 431.97a10.678 10.678 0 0 0 4.979 12.198c4.26 2.406 9.656 1.646 13.031-1.948l126.885-134.344c4.26-4.521 6.271-10.885 5.51-17.469-1.469-12.875 4.427-24.615 15.76-31.396 9.958-5.938 23.177-5.646 32.979.698 8.49 5.531 13.74 13.979 14.76 23.781 1.01 9.656-2.344 19.125-9.198 25.979-6.865 6.865-16.365 10.125-26.219 9.031-6.719-.792-12.885 1.229-17.427 5.531L27.117 450.918a10.674 10.674 0 0 0-1.948 13.031 10.668 10.668 0 0 0 9.271 5.385c.969 0 1.958-.135 2.927-.406l265.385-75.823a10.676 10.676 0 0 0 7.74-10.26c0-55.583 22.76-104.375 41.854-135.521a10.669 10.669 0 0 0-1.552-13.115L235.127 118.543z"></path>
              </g>
            </svg>
          </a>
        </li>
      </ul>

      <div class="sign">
        <svg xmlns="http://www.w3.org/2000/svg" width="73" height="48" viewBox="0 0 21 16">
          <style>
            .draw {
              stroke-dasharray: 102;
              stroke-dashoffset: 102;
            }

            @keyframes draw {
              to {
                stroke-dashoffset: 0;
              }
            }
          </style>
          <g stroke="url(#grayGradient)" fill="none">
            <path class="draw" stroke-width="1.6" style="--duration: 150ms; --delay: 200ms" pathLength="100" d="M9 1L4 15" />
            <path class="draw" stroke-width="1.6" style="--duration: 150ms; --delay: 350ms" pathLength="100" d="M1 6L20 2" />
            <path class="draw" stroke-width="1.4" style="--duration: 250ms; --delay: 550ms" pathLength="100" d="M9 6L8 9Q7 13 11 8T12.5 8T14 8Q18 2 17 7T18.5 8" />
            <text
              class="draw"
              x="13"
              y="15"
              text-anchor="middle"
              font-family="Google Sans, sans-serif"
              font-size="2.8"
              font-weight="700"
              letter-spacing="0.15"
              fill="currentColor"
              stroke="none">UI.DEV</text>
          </g>
        </svg>
      </div>
    `
  }
}

if (!customElements.get('about-me')) {
  customElements.define('about-me', AboutMe)
}
