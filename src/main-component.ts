import { CSSResultGroup, LitElement, html,unsafeCSS } from 'lit'
import { customElement } from 'lit/decorators.js'
import classes from './index.css?inline'
import './components/header-component'
import './components/card-component'
import './components/table-component'

// https://www.hyperui.dev/components/marketing/banners

console.log("main component")

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('main-component')
export class MainComponent extends LitElement {

  render() {
    return html`
      <div class="bg-emerald-200">
      <header-component></header-component>
      <table-component></table-component>
      </div>
    `
  }


  
  static styles?: CSSResultGroup | undefined = [unsafeCSS(classes)];
}

declare global {
  interface HTMLElementTagNameMap {
    'main-component': MainComponent
  }
}
