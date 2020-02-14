export const selectors: Selectors = {
	getBlocksCollapsed: state => state.blocks_collapsed,
	getColorScheme: state => state.color_scheme,
	getMovingType: state => state.moving_type,
	getMovingBlock: state => state.moving_block,
	getView: state => state.view,
	isExpanded: (state, id) => !state.blocks_collapsed.includes(id)
};
