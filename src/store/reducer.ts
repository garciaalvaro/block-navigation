const initial_state: State = {
	view: "navigation",
	color_scheme: "dark-endrina",
	moving_type: null,
	moving_block: null,
	blocks_collapsed: [],
};

export const reducer = (state = initial_state, action: Actions): State => {
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
