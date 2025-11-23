import { v as head, y as ensure_array_like } from './index2-CUSOQepG.js';
import { N as Navbar } from './navbar-CNdDbp_I.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { a as attr } from './attributes-DIZVxfKf.js';
import './context-CXhJZien.js';
import './server-jnIGU4y7.js';
import './event-BOfuoqsS.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let meals = [];
    let searchQuery = "";
    head("1443t8w", $$renderer2, ($$renderer3) => {
      $$renderer3.push(`<script src="https://cdn.tailwindcss.com">
    {
        theme: {
            extend: {
                colors: {
                    'theme-gold': '#8b6f2f',
                    'theme-error': '#c75a5a'
                },
            }
        }
    }
	<\/script><!---->`);
    });
    Navbar($$renderer2);
    $$renderer2.push(`<!----> <div class="layout-container layout-padding-sm"><header class="text-center py-6"><h1 class="header-title">${escape_html(searchQuery)}! ....Mmmh what a nice choice</h1> <p class="header-subtitle">Find ingredients and instructions for any meal.</p></header> `);
    {
      $$renderer2.push("<!--[!-->");
      {
        $$renderer2.push("<!--[!-->");
        {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<div class="back-button-bar" style="padding-bottom: 20px;"><button class="back-button"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path></svg> Go Back to Search</button></div> <div class="meal-list-grid"><!--[-->`);
          const each_array_1 = ensure_array_like(meals);
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            let meal = each_array_1[$$index_1];
            $$renderer2.push(`<button type="button" class="meal-card"><div class="meal-card-image-container meal-card-image-wrap"><img${attr("src", meal.strMealThumb ?? "https://placehold.co/400x225/e7e5e4/44403c?text=Recipe+Preview")}${attr("alt", meal.strMeal)} class="meal-card-image"/></div> <div class="meal-card-content meal-card-text-container"><h3 class="meal-card-title">${escape_html(meal.strMeal)}</h3> <p class="meal-card-cuisine text-white">${escape_html(meal.strArea ?? "Global")} Cuisine</p></div></button>`);
          }
          $$renderer2.push(`<!--]--></div>`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DCJoL5bJ.js.map
