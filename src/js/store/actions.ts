export type ActionCreators = {
	resetMoving: ActionCreator<"RESET_MOVING">;
	setMovingBlock: ActionCreator<"SET_MOVING_BLOCK", State["moving_block"]>;
	setMovingType: ActionCreator<"SET_MOVING_TYPE", State["moving_type"]>;
	setView: ActionCreator<"SET_VIEW", State["view"]>;
	setColorScheme: ActionCreator<"SET_COLOR_SCHEME", State["color_scheme"]>;
};

export const actions = <ActionCreators>{
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
