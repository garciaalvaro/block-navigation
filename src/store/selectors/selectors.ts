import type { State } from "../state";
import type { Selectors } from "./types";

export const selectors: Selectors<State> = {
	block_info_displayed: state => state.block_info_displayed,

	blocks_collapsed: state => state.blocks_collapsed,

	color_scheme: state => state.color_scheme,

	detached_is_expanded: state => state.detached_is_expanded,

	detached_position: state => state.detached_position,

	detached_size: state => state.detached_size,

	is_detached: state => state.is_detached,

	is_dev: state => state.is_dev,

	is_expanded: (state, id) => !state.blocks_collapsed.includes(id),

	moving_block: state => state.moving_block,

	moving_type: state => state.moving_type,

	view: state => state.view,
};
