import type { BlockId } from "@/types";

import type { State } from "../state";

type ActionCreator<T, P = void> = (
	payload: P
) => P extends void ? { type: T } : { type: T; payload: P };

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

	idsUpdate: ActionCreator<"IDS_UPDATE", BlockId[]>;
	idsCollapsedUpdate: ActionCreator<"IDS_COLLAPSED_UPDATE", BlockId[]>;
	idsHiddenUpdate: ActionCreator<"IDS_HIDDEN_UPDATE", BlockId[]>;
	idsVisibleUpdate: ActionCreator<"IDS_VISIBLE_UPDATE", BlockId[]>;

	toggleBlock: ActionCreator<"TOGGLE_BLOCK", BlockId>;

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

export type Action = ReturnType<ActionCreators[keyof ActionCreators]>;
