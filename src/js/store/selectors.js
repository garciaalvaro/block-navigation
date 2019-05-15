import l from "utils";

const selectors = function() {
	return {
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
};

const actions = function() {
	return {
		toggleDevMode() {
			return {
				type: "TOGGLE_DEV_MODE"
			};
		},
		triggerSelectBlock(trigger) {
			return {
				type: "TRIGGER_SELECTBLOCK",
				trigger
			};
		},
		toggleMenu(client_id) {
			return {
				type: "TOGGLE_MENU",
				client_id
			};
		},
		updateMouseOverBlock(client_id, is_end_of_list) {
			return {
				type: "UPDATE_MOUSE_OVER_BLOCK",
				client_id,
				is_end_of_list
			};
		},
		updateMovingBlock(
			move_type,
			client_id,
			parent_client_id,
			template_lock,
			name,
			index
		) {
			return {
				type: "UPDATE_MOVING_BLOCK",
				move_type,
				client_id,
				parent_client_id,
				template_lock,
				name,
				index
			};
		},
		removeMovingBlock() {
			return {
				type: "REMOVE_MOVING_BLOCK"
			};
		},
		collapseBlock(parent_client_id) {
			return {
				type: "COLLAPSE_BLOCK",
				parent_client_id
			};
		},
		expandBlock(parent_client_id) {
			return {
				type: "EXPAND_BLOCK",
				parent_client_id
			};
		},
		updateColorScheme(color_scheme) {
			return {
				type: "UPDATE_COLOR_SCHEME",
				color_scheme
			};
		},
		toggleDropGuides() {
			return {
				type: "TOGGLE_DROP_GUIDES"
			};
		}
	};
};

export default selectors;
