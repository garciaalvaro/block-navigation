export const actions: ActionCreators = {
	collapseBlock: payload => ({
		type: "COLLAPSE_BLOCK",
		payload,
	}),

	expandBlock: payload => ({
		type: "EXPAND_BLOCK",
		payload,
	}),

	resetMoving: () => ({
		type: "RESET_MOVING",
	}),

	setDetachedSize: payload => ({
		type: "SET_DETACHED_SIZE",
		payload,
	}),

	detach: () => ({
		type: "DETACH",
	}),

	resetDetach: () => ({
		type: "RESET_DETACH",
	}),

	resetDetachedSize: () => ({
		type: "RESET_DETACHED_SIZE",
	}),

	expandDetached: () => ({
		type: "EXPAND_DETACHED",
	}),

	collapseDetached: () => ({
		type: "COLLAPSE_DETACHED",
	}),

	setMovingBlock: payload => ({
		type: "SET_MOVING_BLOCK",
		payload,
	}),

	setMovingType: payload => ({
		type: "SET_MOVING_TYPE",
		payload,
	}),

	setView: payload => ({
		type: "SET_VIEW",
		payload,
	}),

	setColorScheme: payload => ({
		type: "SET_COLOR_SCHEME",
		payload,
	}),
};
