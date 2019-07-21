export type Selectors = {
	isDropAbove: Selector<boolean, string>;
	getTabOpen: Selector<State["tab_open"]>;
	getMovingBlock: Selector<State["moving_block"]>;
	getMovingType: Selector<State["moving_type"]>;
	getColorScheme: Selector<State["color_scheme"]>;
	isMoving: Selector<State["is_moving"]>;
	//
	// getSettings: Selector<State["settings"]>;
	// isDevModeActive: Selector<State["dev_mode_active"]>;
	// getDropGuides: Selector<State["drop_guides"]>;
	// didSelectBlockTrigger: Selector<State["selectBlock_triggered"]>;
	// isMoving: Selector<boolean>;
	// isMenuOpen: Selector<boolean>;
	// isMouseOver: Selector<boolean>;
	// // getMoving: Selector<boolean>;
	// getMoveType: Selector<State["moving_block"]["move_type"]>;
	// getMouseOverClientId: Selector<State["mouse_over_block"]["client_id"]>;
	// isExpanded: Selector<boolean>;
	// isCollapsed: Selector<boolean>;
	// getCollapsedParentBlocks: Selector<State["collapsed_parent_blocks"]>;
	// getMovingBlock: Selector<State["moving_block"]>;
	// getMovingBlockClientId: Selector<State["moving_block"]["client_id"]>;
	// getColorScheme: Selector<State["color_scheme"]>;
};

export const selectors = <Selectors>{
	isDropAbove: (state, id) => state.drop_above === id,
	getTabOpen: state => state.tab_open,
	getMovingType: state => state.moving_type,
	getMovingBlock: state => state.moving_block,
	getColorScheme: state => state.color_scheme,
	isMoving: state => state.is_moving
	//
	// getIsMoving: state => state.moving_type !== null,
	// getSettings: state => state.settings,
	// isDevModeActive: state => state.dev_mode_active,
	// getDropGuides: state => state.drop_guides,
	// didSelectBlockTrigger: state => state.selectBlock_triggered,
	// isMoving: (state, client_id) => state.moving_block.client_id === client_id,
	// isMenuOpen: (state, client_id) =>
	// 	state.menu_open_block.client_id === client_id,
	// isMouseOver: (state, client_id, is_end_of_list) => {
	// 	const { mouse_over_block } = state;

	// 	return (
	// 		mouse_over_block.client_id === client_id &&
	// 		mouse_over_block.is_end_of_list === is_end_of_list
	// 	);
	// },
	// // getMoving: state => state.moving_block.client_id !== false,
	// getMoveType: state => state.moving_block.move_type,
	// getMouseOverClientId: state => state.mouse_over_block.client_id,
	// isExpanded: (state, parent_client_id) =>
	// 	!state.collapsed_parent_blocks.includes(parent_client_id),
	// isCollapsed: (state, parent_client_id) =>
	// 	state.collapsed_parent_blocks.includes(parent_client_id),
	// getCollapsedParentBlocks: state => state.collapsed_parent_blocks,
	// getMovingBlock: state => state.moving_block,
	// getMovingBlockClientId: state => state.moving_block.client_id,
	// getColorScheme: state => state.color_scheme
};
