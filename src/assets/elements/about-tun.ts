import { LitElement, html } from 'lit'

export class AboutTun extends LitElement {
  protected createRenderRoot() {
    return this
  }

  protected render() {
    return html`
      <div class="tunlinphyo" aria-hidden="true" role="presentation">
        <img src="/tunlinphyo.png" fetchpriority="low" alt="">
      </div>

      <div class="contact-card" data-inert-aboutme>
        <div class="about">
          <h2 id="about-me-title">Tun Lin Phyo</h2>
          <div class="button-container">
            <button class="open-about-me" type="button" commandfor="aboutme" command="--toggle" aria-controls="aboutme"
              aria-label="Get to know more about Tun Lin Phyo">
              Get to Know Me
            </button>
          </div>
        </div>
        <div class="contact-list">
          <ul>
            <li>
              <a href="https://github.com/tunlinphyo" target="_blank" rel="noopener noreferrer" aria-label="Visit Tun's GitHub profile">
                <div class="icon" aria-hidden="true" role="presentation">
                  <svg width="24" height="24" viewBox="0 0 152 152">
                    <g transform="matrix(1.13,0,0,1.13,-11.38,-11.38)">
                      <path fill="url(#linkGradient)" d="M53.1 141c4.6 0 5.9-1.8 5.9-4.1s0-7.3-.1-14.4c-23.9 5.1-29-11.4-29-11.4-3.9-9.7-9.6-12.4-9.6-12.4-7.8-5.2.6-5.1.6-5.1 8.6.6 13.2 8.7 13.2 8.7 7.7 13 20.1 9.2 25 7 .4-4.3 2.3-8.4 5.5-11.4-19.1-2.1-39.2-9.4-39.2-41.8-.1-8.4 3.1-16.6 8.9-22.7-1-2.1-3.9-10.7.7-22.4 0 0 7.2-2.3 23.7 8.7 14.1-3.8 28.9-3.8 43 0C118 8.8 125.3 11 125.3 11c4.6 11.6 1.7 20.2.9 22.4 5.8 6.1 8.9 14.3 8.8 22.7 0 32.5-20.1 39.6-39.3 41.7 3 2.5 5.8 7.7 5.8 15.6 0 11.4-.1 20.4-.1 23.1 0 2.2 1 4 5.9 4z"></path>
                    </g>
                  </svg>
                </div>
                <div class="label">GitHub</div>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/tunlinphyo" target="_blank" rel="noopener noreferrer" aria-label="Connect with Tun on LinkedIn">
                <div class="icon" aria-hidden="true" role="presentation">
                  <svg width="24" height="24" viewBox="0 0 24 24" style="scale: 1.05;translate: 0 -1px;">
                    <g>
                      <path fill="url(#linkGradient)" d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 0 0 2.882 0z"></path>
                    </g>
                  </svg>
                </div>
                <div class="label">LinkedIn</div>
              </a>
            </li>
            <li>
              <a href="mailto:tunlinphyo.it@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Send email to Tun">
                <div class="icon" aria-hidden="true" role="presentation">
                  <svg width="24" height="24" viewBox="0 0 433.664 433.664">
                    <g fill="url(#linkGradient)">
                      <path d="M229.376 271.616c-4.096 2.56-8.704 3.584-12.8 3.584s-8.704-1.024-12.8-3.584L0 147.2v165.376c0 35.328 28.672 64 64 64h305.664c35.328 0 64-28.672 64-64V147.2L229.376 271.616z"></path>
                      <path d="M369.664 57.088H64c-30.208 0-55.808 21.504-61.952 50.176l215.04 131.072 214.528-131.072c-6.144-28.672-31.744-50.176-61.952-50.176z"></path>
                    </g>
                  </svg>
                </div>
                <div class="label">Email</div>
              </a>
            </li>
          </ul>
        </div>

        <div class="blob"></div>
      </div>

      <div class="about-me" id="aboutme" toggle inert role="region" aria-labelledby="aboutme-title">
        <button class="circle-button about-close" type="button" commandfor="aboutme" command="--toggle" aria-label="Close about me panel"></button>
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
      </div>
    `
  }
}

if (!customElements.get('about-tun')) {
  customElements.define('about-tun', AboutTun)
}
