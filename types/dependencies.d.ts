import "@wordpress/data";

declare module "@wordpress/data" {
	function dispatch(key: "melonpan/block-navigation"): ActionCreators;
	function select(key: "melonpan/block-navigation"): Selectors;
}
