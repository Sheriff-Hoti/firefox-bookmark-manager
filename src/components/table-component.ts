import { CSSResultGroup, LitElement, html,unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import classes from '../index.css?inline'
import { Task } from '@lit/task'
import { Query, search } from '../typed-bookmark-api'
import { repeat } from 'lit/directives/repeat.js'


/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('table-component')
export class TableComponent extends LitElement {

  @property()
  query:Query = {}

  private getBookmarks = new Task(
    this,
    //these two later will become @state and have each an input maybe the search mode will be derived from the query
    //@ts-ignore
    async ([query, searchmode])=>search(query),
    ()=>[this.query]
  )

  render() {
    return this.getBookmarks.render({
      initial: ()=> html`<div>initial</div>`,
      pending: ()=> html`<div>pending</div>`,
      error:(state) => html`${JSON.stringify(state)}`,
      complete(data) {
          console.log('the val',data);
          return html`
          <div class="h-96 overflow-auto">
       <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm overflow-auto">
         <thead class="ltr:text-left rtl:text-right">
           <tr>
             <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">id</th>
             <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Date of Birth</th>
             <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Role</th>
             <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Salary</th>
           </tr>
         </thead>
     
         <tbody class="divide-y divide-gray-200">
            ${
              repeat(
                data,
                value => value.id,
                value => html`
                  <tr>
                    <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">${value.id}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">${value.title}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">Web Developer</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">$120,000</td>
                  </tr>
                `
              )
            }
         </tbody>
       </table>
     </div> 
         `
      },
    })
    
    
  }

  static styles?: CSSResultGroup | undefined = [unsafeCSS(classes)];
}

declare global {
  interface HTMLElementTagNameMap {
    'table-component': TableComponent
  }
}