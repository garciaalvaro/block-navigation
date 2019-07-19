import l from "utils";

const selectors = {
	getIsMoving(state) {
		return state.moving_type !== null;
	},
	getMovingType(state) {
		return state.moving_type;
	},
	getSettings(state) {
		return state.settings;
	},
	////
	////
	////
	isDevModeActive(state) {
		return state.dev_mode_active;
	},
	getDropGuides(state) {
		return state.drop_guides;
	},
	didSelectBlockTrigger(state) {
		return state.selectBlock_triggered;
	},
	isMoving(state, client_id) {
		return state.moving_block.client_id === client_id;
	},
	isMenuOpen(state, client_id) {
		return state.menu_open_block.client_id === client_id;
	},
	isMouseOver(state, client_id, is_end_of_list) {
		const { mouse_over_block } = state;

		return (
			mouse_over_block.client_id === client_id &&
			mouse_over_block.is_end_of_list === is_end_of_list
		);
	},
	getMoving(state) {
		return state.moving_block.client_id !== false;
	},
	getMoveType(state) {
		return state.moving_block.move_type;
	},
	getMouseOverClientId(state) {
		return state.mouse_over_block.client_id;
	},
	isExpanded(state, parent_client_id) {
		return !state.collapsed_parent_blocks.includes(parent_client_id);
	},
	isCollapsed(state, parent_client_id) {
		return state.collapsed_parent_blocks.includes(parent_client_id);
	},
	getCollapsedParentBlocks(state) {
		return state.collapsed_parent_blocks;
	},
	getMovingBlock(state) {
		return state.moving_block;
	},
	getMovingBlockClientId(state) {
		return state.moving_block.client_id;
	},
	getColorScheme(state) {
		return state.color_scheme;
	}
};

export default selectors;
