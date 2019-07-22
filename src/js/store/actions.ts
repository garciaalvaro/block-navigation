export type ActionCreators = {
	finishMoving: ActionCreator<"FINISH_MOVING">;
	setMovingBlock: ActionCreator<"SET_MOVING_BLOCK", State["moving_block"]>;
	setMovingType: ActionCreator<"SET_MOVING_TYPE", State["moving_type"]>;
	setView: ActionCreator<"SET_VIEW", State["view"]>;
	setColorScheme: ActionCreator<"SET_COLOR_SCHEME", State["color_scheme"]>;
};

export const actions = <ActionCreators>{
	finishMoving: () => ({
		type: "FINISH_MOVING"
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
