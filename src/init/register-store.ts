import { registerStore } from "@wordpress/data";

import { actions, reducer, selectors, store_slug } from "@/store";
import type { State } from "@/store";

export const store = registerStore<State>(store_slug, {
	reducer,
	// @ts-expect-error TODO
	actions,
	selectors,

	persist: [
		"color_scheme",
		"is_detached",
		"detached_size",
		"detached_position",
		"is_dev",
		"block_info_displayed",
	],
});
