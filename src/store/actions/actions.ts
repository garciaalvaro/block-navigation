import type { ActionCreators } from "./types";

export const actions: ActionCreators = {
	detachedClose: payload => ({
		type: "DETACHED_CLOSE",
		payload,
	}),

	detachedCollapse: payload => ({
		type: "DETACHED_COLLAPSE",
		payload,
	}),

	detachedExpand: payload => ({
		type: "DETACHED_EXPAND",
		payload,
	}),

	detachedDetach: payload => ({
		type: "DETACHED_DETACH",
		payload,
	}),

	detachedSizeReset: payload => ({
		type: "DETACHED_SIZE_RESET",
		payload,
	}),

	detachedSizeUpdate: payload => ({
		type: "DETACHED_SIZE_UPDATE",
		payload,
	}),

	detachedPositionUpdate: payload => ({
		type: "DETACHED_POSITION_UPDATE",
		payload,
	}),

	idsUpdate: payload => ({
		type: "IDS_UPDATE",
		payload,
	}),

	idsCollapsedUpdate: payload => ({
		type: "IDS_COLLAPSED_UPDATE",
		payload,
	}),

	idsVisibleUpdate: payload => ({
		type: "IDS_VISIBLE_UPDATE",
		payload,
	}),

	toggleBlock: payload => ({
		type: "TOGGLE_BLOCK",
		payload,
	}),

	setBlockInfoDisplayed: payload => ({
		type: "SET_BLOCK_INFO_DISPLAYED",
		payload,
	}),

	setDev: payload => ({
		type: "SET_DEV",
		payload,
	}),

	movingBlockUpdate: payload => ({
		type: "MOVING_BLOCK_UPDATE",
		payload,
	}),

	movingTypeUpdate: payload => ({
		type: "MOVING_TYPE_UPDATE",
		payload,
	}),

	movingTypeReset: () => ({
		type: "MOVING_TYPE_RESET",
	}),

	setView: payload => ({
		type: "SET_VIEW",
		payload,
	}),

	setColorScheme: payload => ({
		type: "SET_COLOR_SCHEME",
		payload,
	}),
};
