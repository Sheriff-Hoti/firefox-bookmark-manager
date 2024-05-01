import { CSSResultGroup, LitElement, html,unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import classes from '../index.css?inline'

const event = new CustomEvent('event-name',{detail:'hi'});

//@ts-ignore
const bookmarks = browser.bookmarks.getRecent(4);
//use thiss very good 

console.log(bookmarks)
  


/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('header-component')
export class HeaderComponent extends LitElement {

  @property()
  smth = "one"  

    gh_link_redirect(){
        console.log('clicked')
        window.dispatchEvent(event);

        // this.smth = "two"
    }

    connectedCallback(): void {
        super.connectedCallback()
        window.addEventListener('event-name-1', (_) => {
          this.smth = 'success'
        });
       
        window.dispatchEvent(event);
    }

  render() {
    return html`
    <header>
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <div class="sm:flex sm:items-center sm:justify-between">
      <div class="text-center sm:text-left">
        <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">Welcome!</h1>

        <p class="mt-1.5 text-sm text-gray-500">Hosted with github pages.</p>
      </div>

      <div class="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
        <button
          @click=${this.gh_link_redirect}
          class="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-5 py-3 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring"
          type="button"
        >
          <span class="text-sm font-medium" >${this.smth}</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</header>
    `
  }

  static styles?: CSSResultGroup | undefined = [unsafeCSS(classes)];
}

declare global {
  interface HTMLElementTagNameMap {
    'header-component': HeaderComponent
  }
}
