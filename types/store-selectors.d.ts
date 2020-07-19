type Selector<T extends keyof State, S = void> = S extends void
	? () => State[T]
	: (state: S) => State[T];

interface Selectors<S = void> {
	getBlocksCollapsed: Selector<"blocks_collapsed", S>;
	getColorScheme: Selector<"color_scheme", S>;
	getMovingType: Selector<"moving_type", S>;
	getMovingBlock: Selector<"moving_block", S>;
	getView: Selector<"view", S>;
	isExpanded: S extends void
	? (id: BlockId) => boolean
	: (state: S, id: BlockId) => boolean;
}
