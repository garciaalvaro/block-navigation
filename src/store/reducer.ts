const initial_state: State = {
	view: "navigation",
	color_scheme: "dark-endrina",
	moving_type: "by_drag",
	moving_block: {
		id: "",
		parent_id: "",
		template_lock: "",
		block_name: "",
		index: 0
	}
};

export const reducer = (state = initial_state, action: Actions) => {
	switch (action.type) {
		case "RESET_MOVING": {
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
		case "SET_COLOR_SCHEME": {
			return {
				...state,
				color_scheme: action.payload
			};
		}
		default:
			return state;
	}
};
