import l, { plugin_namespace } from "../utils/#";
import initial_state from "./initial_state";

const { union, difference } = lodash;
const { registerStore } = wp.data;

const reducer = function() {
	return function(state = initial_state, action) {
		// 'Persistence' takes the saved properties as the whole initial_state,
		// so we need to include the initial_state properties in the first reducer call.
		if (state.moving_block === undefined) {
			state = { ...initial_state, ...state };
		}

		switch (action.type) {
			case "TOGGLE_DEV_MODE": {
				return {
					...state,
					dev_mode_active: !state.dev_mode_active
				};
			}
			case "TOGGLE_DROP_GUIDES": {
				return {
					...state,
					drop_guides: !state.drop_guides
				};
			}
			case "TRIGGER_SELECTBLOCK": {
				return {
					...state,
					selectBlock_triggered: action.trigger
				};
			}
			case "TOGGLE_MENU": {
				return {
					...state,
					menu_open_block: { client_id: action.client_id }
				};
			}
			case "UPDATE_MOUSE_OVER_BLOCK": {
				return {
					...state,
					mouse_over_block: {
						client_id: action.client_id,
						is_end_of_list: action.is_end_of_list
					}
				};
			}
			case "UPDATE_MOVING_BLOCK": {
				return {
					...state,
					moving_block: {
						...action,
						was_expanded: !state.collapsed_parent_blocks.includes(
							action.client_id
						)
					}
				};
			}
			case "REMOVE_MOVING_BLOCK": {
				return {
					...state,
					moving_block: {
						move_type: false,
						client_id: false,
						parent_client_id: false,
						template_lock: false,
						name: false,
						index: false,
						was_expanded: false
					}
				};
			}
			case "COLLAPSE_BLOCK": {
				const collapsed_parent_blocks = union(
					state.collapsed_parent_blocks,
					[action.parent_client_id]
				);

				return {
					...state,
					collapsed_parent_blocks: collapsed_parent_blocks
				};
			}
			case "EXPAND_BLOCK": {
				const collapsed_parent_blocks = difference(
					state.collapsed_parent_blocks,
					[action.parent_client_id]
				);

				return {
					...state,
					collapsed_parent_blocks: collapsed_parent_blocks
				};
			}
			case "UPDATE_COLOR_SCHEME": {
				return {
					...state,
					color_scheme: action.color_scheme
				};
			}
		}

		return state;
	};
};

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

const store = registerStore(plugin_namespace, {
	reducer: reducer(),
	actions: actions(),
	selectors: selectors(),
	controls: {},
	resolvers: {},
	persist: ["color_scheme", "drop_guides", "dev_mode_active"]
});

export default store;
