import "@wordpress/data";
import type { ActionCreators } from "./actions";
import type { Selectors } from "./selectors";

declare module "@wordpress/data" {
	function dispatch(key: "melonpan/block-navigation"): ActionCreators;
	function select(key: "melonpan/block-navigation"): Selectors;
}
