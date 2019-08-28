export const actions: ActionCreators = {
	resetMoving: () => ({
		type: "RESET_MOVING"
	}),
	setMovingBlock: payload => ({
		type: "SET_MOVING_BLOCK",
		payload
	}),
	setMovingType: payload => ({
		type: "SET_MOVING_TYPE",
		payload
	}),
	setView: payload => ({
		type: "SET_VIEW",
		payload
	}),
	setColorScheme: payload => ({
		type: "SET_COLOR_SCHEME",
		payload
	})
};
