import type { State } from "../state";

type ActionCreator<T, P = void> = (
	payload: P
) => P extends void ? { type: T } : { type: T; payload: P };

type BlockId = string;

export interface ActionCreators {
	collapseBlock: ActionCreator<"COLLAPSE_BLOCK", BlockId>;
	expandBlock: ActionCreator<"EXPAND_BLOCK", BlockId>;
	collapseDetached: ActionCreator<"COLLAPSE_DETACHED">;
	expandDetached: ActionCreator<"EXPAND_DETACHED">;
	resetMoving: ActionCreator<"RESET_MOVING">;
	setBlockInfoDisplayed: ActionCreator<
		"SET_BLOCK_INFO_DISPLAYED",
		State["block_info_displayed"]
	>;
	detach: ActionCreator<"DETACH">;
	resetDetach: ActionCreator<"RESET_DETACH">;
	resetDetachedSize: ActionCreator<"RESET_DETACHED_SIZE">;
	setDetachedPosition: ActionCreator<
		"SET_DETACHED_POSITION",
		State["detached_position"]
	>;
	setDetachedSize: ActionCreator<"SET_DETACHED_SIZE", State["detached_size"]>;
	setDev: ActionCreator<"SET_DEV", State["is_dev"]>;
	setMovingBlock: ActionCreator<"SET_MOVING_BLOCK", State["moving_block"]>;
	setMovingType: ActionCreator<"SET_MOVING_TYPE", State["moving_type"]>;
	setView: ActionCreator<"SET_VIEW", State["view"]>;
	setColorScheme: ActionCreator<"SET_COLOR_SCHEME", State["color_scheme"]>;
}

export type Action = ReturnType<ValueOf<ActionCreators>>;
