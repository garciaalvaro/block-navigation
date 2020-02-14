// Actions
type ActionPlain<T> = {
	type: T;
};

type ActionWithPayload<T, P> = ActionPlain<T> & {
	payload: P;
};

// Action Creators
type ActionCreatorPlain<A extends Actions> = {
	(): A;
};

type ActionCreatorWithPayload<A extends ActionsWithPayload> = {
	(payload: A["payload"]): A;
};

// Defined action creators
type ActionCollapseBlock = ActionWithPayload<"COLLAPSE_BLOCK", BlockId>;

type ActionExpandBlock = ActionWithPayload<"EXPAND_BLOCK", BlockId>;

type ActionResetMoving = ActionPlain<"RESET_MOVING">;

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

// Defined actions
type ActionCreators = {
	collapseBlock: ActionCreatorWithPayload<ActionCollapseBlock>;
	expandBlock: ActionCreatorWithPayload<ActionExpandBlock>;
	resetMoving: ActionCreatorPlain<ActionResetMoving>;
	setMovingBlock: ActionCreatorWithPayload<ActionSetMovingBlock>;
	setMovingType: ActionCreatorWithPayload<ActionSetMovingType>;
	setView: ActionCreatorWithPayload<ActionSetView>;
	setColorScheme: ActionCreatorWithPayload<ActionSetColorScheme>;
};

type ActionsPlain = ActionResetMoving;

type ActionsWithPayload =
	| ActionCollapseBlock
	| ActionExpandBlock
	| ActionSetMovingBlock
	| ActionSetMovingType
	| ActionSetView
	| ActionSetColorScheme;

type Actions = ActionsPlain | ActionsWithPayload;
