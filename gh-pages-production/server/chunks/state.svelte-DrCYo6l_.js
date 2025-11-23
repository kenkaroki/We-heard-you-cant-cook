import { A as noop } from './utils2-B0J0vzQT.js';
import './event-BOfuoqsS.js';

const is_legacy = noop.toString().includes("$$") || /function \w+\(\) \{\}/.test(noop.toString());
if (is_legacy) {
  ({
    url: new URL("https://example.com")
  });
}
//# sourceMappingURL=state.svelte-DrCYo6l_.js.map
