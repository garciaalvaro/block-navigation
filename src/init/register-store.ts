import { store_prefix } from "utils/data";
import { reducer } from "store/reducer";
import { actions } from "store/actions";
import { selectors } from "store/selectors";

wp.data.registerStore(store_prefix, {
	// @ts-ignore
	reducer,
	// @ts-ignore
	actions,
	// @ts-ignore
	selectors,
	persist: ["color_scheme"]
});
