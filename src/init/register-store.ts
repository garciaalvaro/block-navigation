import { registerStore } from "@wordpress/data";

import { reducer } from "@/store/reducer";
import { actions } from "@/store/actions";
import { selectors } from "@/store/selectors";

registerStore("melonpan/block-navigation", {
	reducer,
	actions,
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	selectors,
	persist: ["color_scheme"],
});
