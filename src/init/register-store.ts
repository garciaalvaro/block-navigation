import { store_slug } from "utils/data";
import { reducer } from "store/reducer";
import { actions } from "store/actions";
import { selectors } from "store/selectors";

wp.data.registerStore(store_slug, {
	// @ts-ignore
	reducer,
	// @ts-ignore
	actions,
	// @ts-ignore
	selectors,
	persist: ["color_scheme"]
});
