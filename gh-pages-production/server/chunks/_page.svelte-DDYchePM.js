import { w as attr_class, x as stringify } from './index2-CUSOQepG.js';
import { b as base } from './server-jnIGU4y7.js';
import './event-BOfuoqsS.js';
import './utils2-B0J0vzQT.js';
import { a as attr } from './attributes-DIZVxfKf.js';
import './state.svelte-DrCYo6l_.js';
import './escaping-CqgfEcN3.js';
import './context-CXhJZien.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let eyesClosed;
    let email = "";
    let password = "";
    let showPassword = false;
    let carrotGotPassword = false;
    eyesClosed = showPassword;
    $$renderer2.push(`<section class="login">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="food-item carrot" role="img" aria-hidden="true"><span class="emoji-body" aria-hidden="true">🥕</span> <div class="eye-container" aria-hidden="true"><div${attr_class("eye", void 0, { "closed": eyesClosed })} role="presentation"><div class="pupil" role="presentation"></div></div> <div${attr_class("eye", void 0, { "closed": eyesClosed })} role="presentation"><div class="pupil" role="presentation"></div></div></div> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div${attr_class("character-dialogue", void 0, { "visible": showPassword })}>I'm not looking! 🙈</div></div> <div class="food-item cabbage" role="img" aria-hidden="true"><span class="emoji-body" aria-hidden="true">🥬</span> <div class="eye-container" aria-hidden="true"><div${attr_class("eye", void 0, { "closed": showPassword })} role="presentation"><div class="pupil" role="presentation"></div></div> <div${attr_class("eye", void 0, { "closed": showPassword })} role="presentation"><div class="pupil" role="presentation"></div></div></div> <div${attr_class("character-dialogue", void 0, {
        "visible": carrotGotPassword
      })}>`);
      {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`Privacy first! 🤐`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="login-card"><h1>🔐 Log In</h1> <form method="POST" id="login-form"><input type="text" name="email" placeholder="Email Address" required class="email"${attr("value", email)}/> <div class="password-input-group"><input name="password" placeholder="Password" required${attr("type", "password")}${attr("value", password)} aria-describedby="password-help"/> <button type="button" class="toggle-visibility-button"${attr("aria-label", "Show password")}>`);
      {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="2" fill="#333"></circle><path fill="none" stroke="#333" stroke-width="2" d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"></path></svg>`);
      }
      $$renderer2.push(`<!--]--></button></div> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <button type="submit">Sign In</button></form></div> <a${attr("href", `${stringify(base)}/signup`)} class="signup_switch">Don't have an account? SignUp</a>`);
    }
    $$renderer2.push(`<!--]--></section>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DDYchePM.js.map
