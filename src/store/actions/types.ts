import type { State } from "../state";

type ActionCreator<T, P = void> = (
	payload: P
) => P extends void ? { type: T } : { type: T; payload: P };

type BlockId = string;

export interface ActionCreators {
	detachedClose: ActionCreator<"DETACHED_CLOSE">;
	detachedCollapse: ActionCreator<"DETACHED_COLLAPSE">;
	detachedExpand: ActionCreator<"DETACHED_EXPAND">;
	detachedDetach: ActionCreator<"DETACHED_DETACH">;
	detachedSizeReset: ActionCreator<"DETACHED_SIZE_RESET">;
	detachedSizeUpdate: ActionCreator<
		"DETACHED_SIZE_UPDATE",
		State["detached_size"]
	>;
	detachedPositionUpdate: ActionCreator<
		"DETACHED_POSITION_UPDATE",
		State["detached_position"]
	>;

	idsVisibleUpdate: ActionCreator<"IDS_VISIBLE_UPDATE", BlockId[]>;

	collapseBlock: ActionCreator<"COLLAPSE_BLOCK", BlockId>;
	expandBlock: ActionCreator<"EXPAND_BLOCK", BlockId>;

	movingBlockUpdate: ActionCreator<
		"MOVING_BLOCK_UPDATE",
		State["moving_block"]
	>;
	movingTypeUpdate: ActionCreator<"MOVING_TYPE_UPDATE", State["moving_type"]>;
	movingTypeReset: ActionCreator<"MOVING_TYPE_RESET">;

	setBlockInfoDisplayed: ActionCreator<
		"SET_BLOCK_INFO_DISPLAYED",
		State["block_info_displayed"]
	>;
	setDev: ActionCreator<"SET_DEV", State["is_dev"]>;
	setView: ActionCreator<"SET_VIEW", State["view"]>;
	setColorScheme: ActionCreator<"SET_COLOR_SCHEME", State["color_scheme"]>;
}

export type Action = ReturnType<ValueOf<ActionCreators>>;
