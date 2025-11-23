import { a as attr } from './attributes-DIZVxfKf.js';
import './utils2-B0J0vzQT.js';
import './event-BOfuoqsS.js';
import './state.svelte-DrCYo6l_.js';
import { N as Navbar } from './navbar-CNdDbp_I.js';
import './escaping-CqgfEcN3.js';
import './server-jnIGU4y7.js';

function Dashboard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let searchQuery = "";
    Navbar($$renderer2);
    $$renderer2.push(`<!----> <center><section class="search_recipies"><form class="search-form"><input type="search" name="search_bar" id="search_bar"${attr("value", searchQuery)} placeholder="e.g., Lasagna, Pad Thai, Chocolate Cake..." required/> <button type="submit" id="search_button">Search</button></form></section></center> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="loading-container"><div class="spinner"></div> <p class="loading-text">Loading delicious recipes...</p></div>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function _page($$renderer) {
  Dashboard($$renderer);
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DHCqrXMg.js.map
