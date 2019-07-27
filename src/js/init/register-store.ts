import { pr_store } from "utils/data/plugin";
import { reducer } from "store/reducer";
import { actions } from "store/actions";
import { selectors } from "store/selectors";

wp.data.registerStore(pr_store, {
	// @ts-ignore
	reducer,
	// @ts-ignore
	actions,
	// @ts-ignore
	selectors,
	persist: ["color_scheme"]
});
