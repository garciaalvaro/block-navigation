export const selectors: Selectors<State> = {
	getBlocksCollapsed: state => state.blocks_collapsed,

	getColorScheme: state => state.color_scheme,

	getDetachedPosition: state => state.detached_position,

	getDetachedSize: state => state.detached_size,

	detachedIsExpanded: state => state.detached_is_expanded,

	getMovingType: state => state.moving_type,

	getMovingBlock: state => state.moving_block,

	getView: state => state.view,

	isDetached: state => state.is_detached,

	isDev: state => state.is_dev,

	isExpanded: (state, id) => !state.blocks_collapsed.includes(id),
};
