import type { SelectorCreators } from "./types";

export const selectors: SelectorCreators = {
	block_info_displayed: state => state.block_info_displayed,

	color_scheme: state => state.color_scheme,

	detached_is_expanded: state => state.detached_is_expanded,

	detached_position: state => state.detached_position,

	detached_size: state => state.detached_size,

	ids: state => state.ids,

	ids_collapsed: state => state.ids_collapsed,

	ids_visible: state => state.ids_visible,

	is_detached: state => state.is_detached,

	is_dev: state => state.is_dev,

	is_expanded: (state, id) => !state.ids_collapsed.includes(id),

	moving_block: state => state.moving_block,

	moving_type: state => state.moving_type,

	view: state => state.view,

	all_blocks_toggle_counter: state => state.all_blocks_toggle_counter,
};
