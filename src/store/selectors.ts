export const selectors: Selectors = {
	isExpanded: (state, block_id) =>
		!state.collapsed_blocks.find(id => id === block_id),
	getView: state => state.view,
	getMovingType: state => state.moving_type,
	getMovingBlock: state => state.moving_block,
	getColorScheme: state => state.color_scheme,
	isMoving: state => state.moving_block.id !== ""
};
