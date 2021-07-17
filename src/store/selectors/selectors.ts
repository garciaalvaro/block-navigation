import { uniq } from "lodash";

import type { State } from "../state";
import type { Selectors } from "./types";
import { getDescendantIds } from "@/utils";

export const selectors: Selectors<State> = {
	block_info_displayed: state => state.block_info_displayed,

	color_scheme: state => state.color_scheme,

	detached_is_expanded: state => state.detached_is_expanded,

	detached_position: state => state.detached_position,

	detached_size: state => state.detached_size,

	ids: state => state.ids,

	ids_collapsed: state => state.ids_collapsed,

	ids_hidden: state => state.ids_hidden,

	is_detached: state => state.is_detached,

	is_dev: state => state.is_dev,

	is_expanded: (state, id) => !state.ids_collapsed.includes(id),

	moving_block: state => state.moving_block,

	moving_type: state => state.moving_type,

	view: state => state.view,
};
