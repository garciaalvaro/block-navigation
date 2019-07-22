import { color_schemes } from "utils/data/color_schemes";

const { union, difference } = lodash;
const initial_state: State = {
	view: "navigation",
	color_scheme: color_schemes[0],
	moving_type: "by_drag",
	moving_block: {
		id: "",
		parent_id: "",
		template_lock: "",
		block_name: "",
		index: 0
	}
};

export const reducer = (state = initial_state, action) => {
	// // 'Persistence' takes the saved properties as the whole initial_state,
	// // so we need to include the initial_state properties in the first reducer call.
	// if (state.moving_block === undefined) {
	// 	state = { ...initial_state, ...state };
	// }

	switch (action.type) {
		case "FINISH_MOVING": {
			return {
				...state,
				moving_block: {
					id: "",
					parent_id: "",
					template_lock: "",
					block_name: "",
					index: 0
				}
			};
		}
		case "SET_MOVING_TYPE": {
			return {
				...state,
				moving_type: action.payload
			};
		}
		case "SET_MOVING_BLOCK": {
			return {
				...state,
				moving_block: action.payload
			};
		}
		case "SET_VIEW": {
			return {
				...state,
				view: action.payload
			};
		}
		////
		// case "TOGGLE_DEV_MODE": {
		// 	return {
		// 		...state,
		// 		dev_mode_active: !state.dev_mode_active
		// 	};
		// }
		// case "TOGGLE_DROP_GUIDES": {
		// 	return {
		// 		...state,
		// 		drop_guides: !state.drop_guides
		// 	};
		// }
		// case "TRIGGER_SELECTBLOCK": {
		// 	return {
		// 		...state,
		// 		selectBlock_triggered: action.trigger
		// 	};
		// }
		// case "TOGGLE_MENU": {
		// 	return {
		// 		...state,
		// 		menu_open_block: { client_id: action.client_id }
		// 	};
		// }
		// case "UPDATE_MOUSE_OVER_BLOCK": {
		// 	return {
		// 		...state,
		// 		mouse_over_block: {
		// 			client_id: action.client_id,
		// 			is_end_of_list: action.is_end_of_list
		// 		}
		// 	};
		// }
		// case "UPDATE_MOVING_BLOCK": {
		// 	return {
		// 		...state,
		// 		moving_block: {
		// 			...action,
		// 			was_expanded: !state.collapsed_parent_blocks.includes(
		// 				action.client_id
		// 			)
		// 		}
		// 	};
		// }
		// case "REMOVE_MOVING_BLOCK": {
		// 	return {
		// 		...state,
		// 		moving_block: {
		// 			move_type: false,
		// 			client_id: false,
		// 			parent_client_id: false,
		// 			template_lock: false,
		// 			name: false,
		// 			index: false,
		// 			was_expanded: false
		// 		}
		// 	};
		// }
		// case "COLLAPSE_BLOCK": {
		// 	const collapsed_parent_blocks = union(state.collapsed_parent_blocks, [
		// 		action.parent_client_id
		// 	]);

		// 	return {
		// 		...state,
		// 		collapsed_parent_blocks: collapsed_parent_blocks
		// 	};
		// }
		// case "EXPAND_BLOCK": {
		// 	const collapsed_parent_blocks = difference(
		// 		state.collapsed_parent_blocks,
		// 		[action.parent_client_id]
		// 	);

		// 	return {
		// 		...state,
		// 		collapsed_parent_blocks: collapsed_parent_blocks
		// 	};
		// }
		// case "UPDATE_COLOR_SCHEME": {
		// 	return {
		// 		...state,
		// 		color_scheme: action.color_scheme
		// 	};
		// }
	}

	return state;
};
