import type { AnyAction } from "@wordpress/data";
import type { Selectors } from "@/store";

declare module "@wordpress/data" {
	function dispatch(key: "melonpan/block-navigation"): ActionCreators;
	function select(key: "melonpan/block-navigation"): Selectors;

	function register(store: Store<State, AnyAction>);
	function createReduxStore(
		key: "melonpan/block-navigation",
		store: {
			reducer: Reducer;
			actions: ActionCreators;
			selectors: SelectorCreators;
			persist: (keyof State)[];
		}
	): Store<State, AnyAction>;

	// eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
	function select(key: "core/block-editor"):
		| typeof import("@types/wordpress__block-editor/store/selectors")
		| {
				getBlockParents: () => void; // TODO
		  };
}
