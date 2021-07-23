import { select } from "@wordpress/data";

import { getPrevId } from "../get-prev-id";
import { canHaveChildren } from "../can-have-children";
import type { Util } from "./types";
import type { DropArea } from "@/types";
import { getAncestorsId, getParentId } from "@/utils";

// The drop area represents where the block will be dropped.
// Given an id, the drop will occur as a children of it.
export const getDropAreas: Util = ({
	id,
	ancestors_id,
	ids_visible,
	moving_block,
}) => {
	const drop_areas: DropArea[] = [];

	let prev_id = getPrevId(id, ids_visible);

	// If there is no previous id, it is the first
	// block in the list.
	if (!prev_id) {
		return [
			{
				index: 0,
				level: 0,
				id: "",
			},
		];
	}

	let prev_level = getAncestorsId(prev_id).length - ancestors_id.length;

	while (prev_level >= -1) {
		// If the block can have children, add the drop area
		if (canHaveChildren(prev_id, moving_block)) {
			drop_areas.push({
				id: prev_id,
				level: prev_level + 1,
				index:
					prev_level === -1
						? select("core/block-editor").getBlockIndex(id)
						: select("core/block-editor").getBlockOrder(prev_id)
								.length,
			});
		}

		prev_id = getParentId(prev_id) || "";
		prev_level = prev_level - 1;
	}

	return drop_areas.reverse();
};
