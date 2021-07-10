import { registerStore } from "@wordpress/data";

import { store_slug, reducer, actions, selectors } from "@/store";

export const store = registerStore<State>(store_slug, {
	reducer,
	// @ts-expect-error TODO
	actions,
	// @ts-expect-error TODO
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
