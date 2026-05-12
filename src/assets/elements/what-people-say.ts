import { LitElement, html } from 'lit'

export class WhatPeopleSay extends LitElement {
  protected createRenderRoot() {
    return this
  }

  protected render() {
    return html`
      <div class="people">
        <div class="heading">
          <h2 id="testimonial-title">What People Say</h2>
          <p class="testimonial-hint">Select a colleague to read what they said.</p>
        </div>

        <div class="arrow-container" aria-hidden="true" role="presentation">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="5 0 9.205 24">
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
              @keyframes draw-back {
                to {
                  stroke-dashoffset: 102;
                }
              }
            </style>
            <g stroke-width="0.4" fill="none" stroke-dasharray="1 1.2" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="url(#accentGradient)" class="draw draw-1" pathLength="100" d="M 8 1 C 11 4 14 7 11 10 C 9 12 6 10 6.5 7.5 C 7 5.5 11 5 12.5 7.5 C 14 10 13 12 10.5 13 C 8 14 7 16.5 9 21" />
              <path stroke="var(--accent-end)" class="draw draw-2" pathLength="100" d="M 11 19 L 10 23 L 6 21" />
            </g>
          </svg>
        </div>

        <div class="people-center" style="--count: 5">
          <div class="people-group" style="--border: rgb(239,195,73)">
            <button type="button" hoverclick="focusonly" popovertarget="message-1" class="person" data-name="PF"
              style="--index: 1" aria-label="Open testimonial from Person Five">
              <img src="/people/10.jpg" alt="" decoding="async" fetchpriority="low" />
            </button>
            <div class="message" id="message-1" popover role="region" aria-labelledby="message-1-title">
              <div class="message-container">
                <h3 id="message-1-title" class="sr-only">Testimonial from Person Five</h3>
                <svg class="quotemark" aria-hidden="true" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 24">
                  <path fill="url(#accentGradient)" d="M 0 0 L 12 0 L 12 10 L 6 10 Q 6 16 12 18 L 12 24 Q 0 21 0 10 L 0 0 Z M 15 0 L 27 0 L 27 10 L 21 10 Q 21 16 27 18 L 27 24 Q 15 21 15 10 L 15 0 Z"/>
                </svg>
                <blockquote>
                  Tun sets the standard for seniority through his professionalism,
                  clarity, patience, and supportive leadership.
                </blockquote>
                <div class="quoter">
                  <div class="avatar">
                    <img src="/people/10.jpg" alt="" fetchpriority="low" />
                  </div>
                  <div class="about-quoter">
                    <h4 class="name">Person Five</h4>
                    <div class="position">Software Engineer at ABC</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="people-group" style="--border: rgb(164,174,181)">
            <button type="button" hoverclick="focusonly" popovertarget="message-3" class="person" data-name="PF"
              style="--index: 2" aria-label="Open testimonial from Person Four">
              <img src="/people/5.jpg" alt="" decoding="async" fetchpriority="low" />
            </button>
            <div class="message" id="message-3" popover role="region" aria-labelledby="message-3-title">
              <div class="message-container">
                <h3 id="message-3-title" class="sr-only">Testimonial from Person Four</h3>
                <svg class="quotemark" aria-hidden="true" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 24">
                  <path fill="url(#accentGradient)" d="M 0 0 L 12 0 L 12 10 L 6 10 Q 6 16 12 18 L 12 24 Q 0 21 0 10 L 0 0 Z M 15 0 L 27 0 L 27 10 L 21 10 Q 21 16 27 18 L 27 24 Q 15 21 15 10 L 15 0 Z"/>
                </svg>
                <blockquote>
                  He is a passionate and hardworking professional who takes strong ownership of
                  his work and consistently delivers reliable results.
                </blockquote>
                <div class="quoter">
                  <div class="avatar">
                    <img src="/people/5.jpg" alt="" fetchpriority="low">
                  </div>
                  <div class="about-quoter">
                    <h4 class="name">Person Four</h4>
                    <div class="position">Team Lead at XYZ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="people-group" style="--border: rgb(234,120,155)">
            <button type="button" hoverclick="focusonly" popovertarget="message-5" class="person" data-name="PT"
              style="--index: 3" aria-label="Open testimonial from Person Three">
              <img src="/people/2.jpg" alt="" decoding="async" fetchpriority="low" />
            </button>
            <div class="message" id="message-5" popover role="region" aria-labelledby="message-5-title">
              <div class="message-container">
                <h3 id="message-5-title" class="sr-only">Testimonial from Person Three</h3>
                <svg class="quotemark" aria-hidden="true" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 24">
                  <path fill="url(#accentGradient)" d="M 0 0 L 12 0 L 12 10 L 6 10 Q 6 16 12 18 L 12 24 Q 0 21 0 10 L 0 0 Z M 15 0 L 27 0 L 27 10 L 21 10 Q 21 16 27 18 L 27 24 Q 15 21 15 10 L 15 0 Z"/>
                </svg>
                <blockquote>
                  Tun is a dependable and skilled developer who communicates clearly,
                  collaborates well, and consistently delivers quality results.
                  <!-- He approaches complex technical challenges methodically and provides thoughtful,
                  production-ready solutions across browsers, devices, and multilingual environments. -->
                </blockquote>
                <div class="quoter">
                  <div class="avatar">
                    <img src="/people/2.jpg" alt="" fetchpriority="low">
                  </div>
                  <div class="about-quoter">
                    <h4 class="name">Person Three</h4>
                    <div class="position">Project Manager at Company A</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="people-group" style="--border: rgb(232,139,62)">
            <button type="button" hoverclick="focusonly" popovertarget="message-4" class="person" data-name="PT"
              style="--index: 4" aria-label="Open testimonial from Person Two">
              <img src="/people/12.jpg" alt="" decoding="async" fetchpriority="low" />
            </button>
            <div class="message" id="message-4" popover role="region" aria-labelledby="message-4-title">
              <div class="message-container">
                <h3 id="message-4-title" class="sr-only">Testimonial from Person Two</h3>
                <svg class="quotemark" aria-hidden="true" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 24">
                  <path fill="url(#accentGradient)" d="M 0 0 L 12 0 L 12 10 L 6 10 Q 6 16 12 18 L 12 24 Q 0 21 0 10 L 0 0 Z M 15 0 L 27 0 L 27 10 L 21 10 Q 21 16 27 18 L 27 24 Q 15 21 15 10 L 15 0 Z"/>
                </svg>
                <blockquote>
                  Tun is a talented developer who combines fast learning, strong technical skill, clear
                  communication, and innovative thinking to consistently deliver high-quality work.
                </blockquote>
                <div class="quoter">
                  <div class="avatar">
                    <img src="/people/12.jpg" alt="" fetchpriority="low">
                  </div>
                  <div class="about-quoter">
                    <h4 class="name">Person Two</h4>
                    <div class="position">Head UI/UX Specialist at Company B</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="people-group" style="--border: rgb(214,79,74)">
            <button type="button" hoverclick="focusonly" popovertarget="message-6" class="person" data-name="PO"
              style="--index: 5" aria-label="Open testimonial from Person One">
              <img src="/people/8.jpg" alt="" decoding="async" fetchpriority="low" />
            </button>
            <div class="message" id="message-6" popover role="region" aria-labelledby="message-6-title">
              <div class="message-container">
                <h3 id="message-6-title" class="sr-only">Testimonial from Person One</h3>
                <svg class="quotemark" aria-hidden="true" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 24">
                  <path fill="url(#accentGradient)" d="M 0 0 L 12 0 L 12 10 L 6 10 Q 6 16 12 18 L 12 24 Q 0 21 0 10 L 0 0 Z M 15 0 L 27 0 L 27 10 L 21 10 Q 21 16 27 18 L 27 24 Q 15 21 15 10 L 15 0 Z"/>
                </svg>
                <blockquote>
                  He maintains a high professional standard and continuously refines his approach to
                  deliver consistent, dependable engineering outcomes.
                </blockquote>
                <div class="quoter">
                  <div class="avatar">
                    <img src="/people/8.jpg" alt="" fetchpriority="low">
                  </div>
                  <div class="about-quoter">
                    <h4 class="name">Person One</h4>
                    <div class="position">Head of Engineering at ABC</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
}

if (!customElements.get('what-people-say')) {
  customElements.define('what-people-say', WhatPeopleSay)
}
