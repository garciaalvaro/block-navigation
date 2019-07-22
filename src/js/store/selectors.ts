export type Selectors = {
	getView: Selector<State["view"]>;
	getMovingBlock: Selector<State["moving_block"]>;
	getMovingType: Selector<State["moving_type"]>;
	getColorScheme: Selector<State["color_scheme"]>;
	isMoving: Selector<boolean>;
};

export const selectors = <Selectors>{
	getView: state => state.view,
	getMovingType: state => state.moving_type,
	getMovingBlock: state => state.moving_block,
	getColorScheme: state => state.color_scheme,
	isMoving: state => state.moving_block.id !== ""
};
