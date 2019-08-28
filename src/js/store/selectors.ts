export const selectors: Selectors = {
	getView: state => state.view,
	getMovingType: state => state.moving_type,
	getMovingBlock: state => state.moving_block,
	getColorScheme: state => state.color_scheme,
	isMoving: state => state.moving_block.id !== ""
};
