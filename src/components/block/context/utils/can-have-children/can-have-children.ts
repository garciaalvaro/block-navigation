import { store_slug } from "@/store";
import { select } from "@wordpress/data";

import type { Util } from "./types";

export const canHaveChildren: Util = (id, moving_block) => {
	if (!moving_block) {
		return false;
	}

	const can_have_children = select("core/block-editor").canInsertBlockType(
		moving_block?.name || "",
		id
	);

	const is_expanded = select(store_slug).is_expanded(id);

	return can_have_children && is_expanded;
};
