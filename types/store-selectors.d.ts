type Selector<T, P = null> = (state: State, parameter: P) => T;

type Selectors = {
	getBlocksCollapsed: Selector<State["blocks_collapsed"]>;
	getColorScheme: Selector<State["color_scheme"]>;
	getMovingBlock: Selector<State["moving_block"]>;
	getMovingType: Selector<State["moving_type"]>;
	getView: Selector<State["view"]>;
	isExpanded: Selector<boolean, BlockId>;
};
