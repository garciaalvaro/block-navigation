import { state as initial_state } from "../state";
import type { Reducer } from "./types";

export const reducer: Reducer = (state = initial_state, action) => {
	switch (action.type) {
		case "DETACHED_CLOSE": {
			return {
				...state,
				is_detached: false,
			};
		}

		case "DETACHED_COLLAPSE": {
			return {
				...state,
				detached_is_expanded: false,
			};
		}

		case "DETACHED_EXPAND": {
			return {
				...state,
				detached_is_expanded: true,
			};
		}

		case "DETACHED_DETACH": {
			return {
				...state,
				is_detached: true,
				detached_is_expanded: true,
			};
		}

		case "DETACHED_SIZE_RESET": {
			return {
				...state,
				detached_size: initial_state.detached_size,
			};
		}

		case "DETACHED_SIZE_UPDATE": {
			return {
				...state,
				detached_size: action.payload,
			};
		}

		case "DETACHED_POSITION_UPDATE": {
			return {
				...state,
				detached_position: action.payload,
			};
		}

		case "IDS_UPDATE": {
			return {
				...state,
				ids: action.payload,
			};
		}

		case "IDS_COLLAPSED_UPDATE": {
			return {
				...state,
				ids_collapsed: action.payload,
			};
		}

		case "IDS_HIDDEN_UPDATE": {
			return {
				...state,
				ids_hidden: action.payload,
			};
		}

		case "IDS_VISIBLE_UPDATE": {
			return {
				...state,
				ids_visible: action.payload,
			};
		}

		case "COLLAPSE_BLOCK": {
			return {
				...state,
				ids_collapsed: [...state.ids_collapsed, action.payload],
			};
		}

		case "EXPAND_BLOCK": {
			return {
				...state,
				ids_collapsed: state.ids_collapsed.filter(
					id => id !== action.payload
				),
			};
		}

		case "MOVING_BLOCK_UPDATE": {
			return {
				...state,
				moving_block: action.payload,
			};
		}

		case "MOVING_TYPE_UPDATE": {
			return {
				...state,
				moving_type: action.payload,
			};
		}

		case "MOVING_TYPE_RESET": {
			return {
				...state,
				moving_type: initial_state.moving_type,
			};
		}

		case "SET_BLOCK_INFO_DISPLAYED": {
			return {
				...state,
				block_info_displayed: action.payload,
			};
		}

		case "SET_DEV": {
			return {
				...state,
				is_dev: action.payload,
			};
		}

		case "SET_VIEW": {
			return {
				...state,
				view: action.payload,
			};
		}

		case "SET_COLOR_SCHEME": {
			return {
				...state,
				color_scheme: action.payload,
			};
		}

		default:
			return state;
	}
};
