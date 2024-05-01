import { CSSResultGroup, LitElement, html,unsafeCSS } from 'lit'
import { customElement } from 'lit/decorators.js'
import classes from '../index.css?inline'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('cards-layout')
export class CardsLayout extends LitElement {

  render() {
    return html`
      
    `
  }

  static styles?: CSSResultGroup | undefined = [unsafeCSS(classes)];
}

declare global {
  interface HTMLElementTagNameMap {
    'cards-layout': CardsLayout
  }
}
