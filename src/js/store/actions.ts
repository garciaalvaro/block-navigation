export type ActionCreators = {
	finishMoving: ActionCreator<"FINISH_MOVING">;
	setMovingBlock: ActionCreator<"SET_MOVING_BLOCK", State["moving_block"]>;
	openTab: ActionCreator<"OPEN_TAB", State["tab_open"]>;
};

export const actions = <ActionCreators>{
	finishMoving: () => ({
		type: "FINISH_MOVING"
	}),
	setMovingBlock: payload => ({
		type: "SET_MOVING_BLOCK",
		payload
	}),
	openTab: payload => ({
		type: "OPEN_TAB",
		payload
	})
};
