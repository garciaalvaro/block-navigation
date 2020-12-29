const initial_state: State = {
	view: "navigation",
	color_scheme: "light-wp",
	moving_type: null,
	moving_block: null,
	blocks_collapsed: [],
	is_detached: false,
	is_dev: false,
	detached_is_expanded: false,
	detached_size: { width: 240, height: 400 },
};

interface Reducer {
	(state: State | undefined, action: Action): State;
}

export const reducer: Reducer = (state = initial_state, action) => {
	switch (action.type) {
		case "COLLAPSE_BLOCK": {
			return {
				...state,
				blocks_collapsed: [...state.blocks_collapsed, action.payload],
			};
		}

		case "EXPAND_BLOCK": {
			return {
				...state,
				blocks_collapsed: state.blocks_collapsed.filter(
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

		case "SET_DETACHED_SIZE": {
			return {
				...state,
				detached_size: action.payload,
			};
		}

		case "RESET_DETACHED_SIZE": {
			return {
				...state,
				detached_size: initial_state.detached_size,
			};
		}

		case "DETACH": {
			return {
				...state,
				is_detached: true,
				detached_is_expanded: true,
				view: "navigation",
			};
		}

		case "RESET_DETACH": {
			return {
				...state,
				is_detached: false,
				view: "navigation",
			};
		}

		case "COLLAPSE_DETACHED": {
			return {
				...state,
				detached_is_expanded: false,
			};
		}

		case "EXPAND_DETACHED": {
			return {
				...state,
				detached_is_expanded: true,
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
