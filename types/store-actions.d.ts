type ActionCreator<T, P = void> = (
	payload: P
) => P extends void ? { type: T } : { type: T; payload: P };

type ActionCreators = {
	collapseBlock: ActionCreator<"COLLAPSE_BLOCK", BlockId>;
	expandBlock: ActionCreator<"EXPAND_BLOCK", BlockId>;
	resetMoving: ActionCreator<"RESET_MOVING">;
	setDetached: ActionCreator<"SET_DETACHED", State["is_detached"]>;
	setMovingBlock: ActionCreator<"SET_MOVING_BLOCK", State["moving_block"]>;
	setMovingType: ActionCreator<"SET_MOVING_TYPE", State["moving_type"]>;
	setView: ActionCreator<"SET_VIEW", State["view"]>;
	setColorScheme: ActionCreator<"SET_COLOR_SCHEME", State["color_scheme"]>;
};

type Actions = ReturnType<ValueOf<ActionCreators>>;
