import { registerStore } from "@wordpress/data";

import { store_slug } from "@/utils/data";
import { reducer } from "@/store/reducer";
import { actions } from "@/store/actions";
import { selectors } from "@/store/selectors";

registerStore(store_slug, {
	reducer,
	actions,
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	selectors,
	persist: ["color_scheme"],
});
