import { w as attr_class } from './index2-CUSOQepG.js';
import './event-BOfuoqsS.js';
import './utils2-B0J0vzQT.js';
import { a as attr } from './attributes-DIZVxfKf.js';
import './state.svelte-DrCYo6l_.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './context-CXhJZien.js';

function Landingpage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let isAuth = false;
    let currentScene = "initial";
    let isTransitioning = false;
    const dialogues = {
      initial: {
        carrot: [
          "I heard they can't cook.",
          "Word is they're kitchen-challenged.",
          "Rumor has it...no cooking skills!"
        ],
        cabbage: [
          "Well, we'll see about that.",
          "Let's find out!",
          "Time will tell..."
        ]
      },
      reaction: {
        carrot: ["I told you! 💰", "Called it! 💵", "Knew it! 💸"],
        cabbage: ["💸", "🤑", "💰"]
      },
      noAccount: {
        carrot: [
          "They really think they can cook without us? 🙄",
          "Bold move going solo... bold move.",
          "Good luck cooking without our help! 🙄"
        ],
        cabbage: [
          "This is gonna be interesting... 🍿",
          "We'll see how that goes! 😂",
          "Oh they're gonna need us soon enough! 🤭"
        ]
      }
    };
    function getRandomDialogue(scene, character) {
      const options = dialogues[scene][character];
      return options[Math.floor(Math.random() * options.length)];
    }
    let carrotDialogue = getRandomDialogue("initial", "carrot");
    let cabbageDialogue = getRandomDialogue("initial", "cabbage");
    $$renderer2.push(`<section${attr_class("landpage", void 0, { "scene-loggedin": isAuth })} role="main" aria-label="Welcome page">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="food-item carrot" role="img" aria-label="Animated carrot character">`);
      {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="dialogue dialogue-carrot" aria-live="polite">${escape_html(carrotDialogue)}</div>`);
      }
      $$renderer2.push(`<!--]--> <span class="emoji-body" aria-hidden="true">🥕</span> <div class="eye-container" aria-hidden="true"><div class="eye"><div class="pupil"></div></div> <div class="eye"><div class="pupil"></div></div></div></div> <div class="food-item cabbage" role="img" aria-label="Animated cabbage character">`);
      {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="dialogue dialogue-cabbage" aria-live="polite">${escape_html(cabbageDialogue)}</div>`);
      }
      $$renderer2.push(`<!--]--> <span class="emoji-body" aria-hidden="true">🥬</span> <div class="eye-container" aria-hidden="true"><div class="eye"><div class="pupil"></div></div> <div class="eye"><div class="pupil"></div></div></div></div> <div${attr_class("card-container", void 0, { "hidden": currentScene === "noAccount" })}>`);
      {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div${attr_class("content-wrapper", void 0, { "transitioning": isTransitioning })}><h1>We heard you can't cook.... 🤔</h1> <div class="button-group"><button${attr("disabled", isTransitioning, true)} aria-label="Confirm you can't cook">Yeah, that's true...</button></div></div>`);
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></section>`);
  });
}
function _page($$renderer) {
  Landingpage($$renderer);
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Bt5KzLds.js.map
