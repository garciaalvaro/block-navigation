export const selectors: Selectors<State> = {
	getBlocksCollapsed: state => state.blocks_collapsed,

	getColorScheme: state => state.color_scheme,

	getMovingType: state => state.moving_type,

	getMovingBlock: state => state.moving_block,

	getView: state => state.view,

	isDetached: state => state.is_detached,

	isExpanded: (state, id) => !state.blocks_collapsed.includes(id),
};
