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

		case "IDS_VISIBLE_UPDATE": {
			return {
				...state,
				ids_collapsed: action.payload,
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

		case "SET_MOVING_TYPE": {
			return {
				...state,
				moving_type: action.payload,
			};
		}

		case "RESET_MOVING": {
			return {
				...state,
				moving_block: null,
				moving_type: null,
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

		case "SET_MOVING_BLOCK": {
			return {
				...state,
				moving_block: action.payload,
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
