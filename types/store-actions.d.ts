interface ActionWithPayload<T, P> {
	type: T;
	payload: P;
}
interface ActionNoPayload<T> {
	type: T;
}

interface ActionCreatorWithPayload<A extends ActionsWithPayload> {
	(payload: A["payload"]): A;
}
interface ActionCreatorNoPayload<A extends ActionsNoPayload> {
	(): A;
}

type ActionCollapseBlock = ActionWithPayload<"COLLAPSE_BLOCK", BlockId>;
type ActionExpandBlock = ActionWithPayload<"EXPAND_BLOCK", BlockId>;
type ActionResetMoving = ActionNoPayload<"RESET_MOVING">;
type ActionSetMovingBlock = ActionWithPayload<
	"SET_MOVING_BLOCK",
	State["moving_block"]
>;
type ActionSetMovingType = ActionWithPayload<
	"SET_MOVING_TYPE",
	State["moving_type"]
>;
type ActionSetView = ActionWithPayload<"SET_VIEW", State["view"]>;
type ActionSetColorScheme = ActionWithPayload<
	"SET_COLOR_SCHEME",
	State["color_scheme"]
>;

interface ActionCreators {
	collapseBlock: ActionCreatorWithPayload<ActionCollapseBlock>;
	expandBlock: ActionCreatorWithPayload<ActionExpandBlock>;
	resetMoving: ActionCreatorNoPayload<ActionResetMoving>;
	setMovingBlock: ActionCreatorWithPayload<ActionSetMovingBlock>;
	setMovingType: ActionCreatorWithPayload<ActionSetMovingType>;
	setView: ActionCreatorWithPayload<ActionSetView>;
	setColorScheme: ActionCreatorWithPayload<ActionSetColorScheme>;
}

type ActionsNoPayload = ActionResetMoving;

type ActionsWithPayload =
	| ActionCollapseBlock
	| ActionExpandBlock
	| ActionSetMovingBlock
	| ActionSetMovingType
	| ActionSetView
	| ActionSetColorScheme;

type Actions = ActionsNoPayload | ActionsWithPayload;
