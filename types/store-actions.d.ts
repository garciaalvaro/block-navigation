type ActionCreator<T, P = void> = (
	payload: P
) => P extends void ? { type: T } : { type: T; payload: P };

interface ActionCreators {
	collapseBlock: ActionCreator<"COLLAPSE_BLOCK", BlockId>;
	expandBlock: ActionCreator<"EXPAND_BLOCK", BlockId>;
	collapseDetached: ActionCreator<"COLLAPSE_DETACHED">;
	expandDetached: ActionCreator<"EXPAND_DETACHED">;
	resetMoving: ActionCreator<"RESET_MOVING">;
	detach: ActionCreator<"DETACH">;
	resetDetach: ActionCreator<"RESET_DETACH">;
	setDetachedSize: ActionCreator<"SET_DETACHED_SIZE", State["detached_size"]>;
	setMovingBlock: ActionCreator<"SET_MOVING_BLOCK", State["moving_block"]>;
	setMovingType: ActionCreator<"SET_MOVING_TYPE", State["moving_type"]>;
	setView: ActionCreator<"SET_VIEW", State["view"]>;
	setColorScheme: ActionCreator<"SET_COLOR_SCHEME", State["color_scheme"]>;
}

type Actions = ReturnType<ValueOf<ActionCreators>>;
