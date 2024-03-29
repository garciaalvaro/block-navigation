import type { State } from "./types";

// Initial state
export const state: State = {
	view: "navigation",
	color_scheme: "light-wp", // TODO: set color type
	is_detached: false,
	is_dev: false,
	block_info_displayed: "title_content",
	all_blocks_toggle_counter: 0,

	ids: null,
	ids_collapsed: [],
	ids_visible: [],

	moving_block: null,
	moving_type: null,

	detached_position: "left",
	detached_is_expanded: false,
	detached_size: { width: 240, height: 400 },
};
