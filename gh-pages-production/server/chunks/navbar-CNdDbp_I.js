import { a as attr } from './attributes-DIZVxfKf.js';
import { b as base } from './server-jnIGU4y7.js';
import './event-BOfuoqsS.js';

function Navbar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let home = `${base}/dashboard`;
    let login = `${base}/login`;
    let signup = `${base}/signup`;
    $$renderer2.push(`<nav class="navbar">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<a${attr("href", home)}>Home</a> <a${attr("href", login)}>Login</a> <a${attr("href", signup)}>Sign Up</a>`);
    }
    $$renderer2.push(`<!--]--></nav>`);
  });
}

export { Navbar as N };
//# sourceMappingURL=navbar-CNdDbp_I.js.map
