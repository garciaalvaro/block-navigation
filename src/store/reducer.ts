const initial_state: State = {
	view: "navigation",
	color_scheme: "dark-endrina",
	moving_type: "by_drag",
	moving_block: {
		id: "",
		parent_id: "",
		template_lock: "",
		block_name: "",
		index: 0,
		was_expanded: true
	},
	collapsed_blocks: []
};

export const reducer = (state = initial_state, action: Actions) => {
	switch (action.type) {
		case "COLLAPSE_BLOCK": {
			return {
				...state,
				collapsed_blocks: [...state.collapsed_blocks, action.payload]
			};
		}

		case "EXPAND_BLOCK": {
			return {
				...state,
				collapsed_blocks: state.collapsed_blocks.filter(
					id => id !== action.payload
				)
			};
		}

		case "SET_MOVING_TYPE": {
			return {
				...state,
				moving_type: action.payload
			};
		}

		case "RESET_MOVING": {
			const { moving_block, collapsed_blocks } = state;

			return {
				...state,
				moving_block: {
					id: "",
					parent_id: "",
					template_lock: "",
					block_name: "",
					index: 0
				},
				collapsed_blocks: moving_block.was_expanded
					? collapsed_blocks.filter(id => id !== moving_block.id)
					: collapsed_blocks
			};
		}

		case "SET_MOVING_BLOCK": {
			const { collapsed_blocks } = state;

			return {
				...state,
				moving_block: action.payload,
				collapsed_blocks: action.payload.was_expanded
					? [...collapsed_blocks, action.payload.id]
					: collapsed_blocks
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
