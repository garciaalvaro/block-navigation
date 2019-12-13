type Selector<T, P = null> = (state: State, parameter: P) => T;

interface Selectors {
	isExpanded: Selector<boolean>;
	getView: Selector<State["view"]>;
	getMovingBlock: Selector<State["moving_block"]>;
	getMovingType: Selector<State["moving_type"]>;
	getColorScheme: Selector<State["color_scheme"]>;
	isMoving: Selector<boolean>;
}
