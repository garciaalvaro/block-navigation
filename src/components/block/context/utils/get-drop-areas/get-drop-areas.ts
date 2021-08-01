import { select } from "@wordpress/data";

import type { DropArea } from "@/types";
import { getAncestorIds, getParentId } from "@/utils";

import { getPrevId } from "../get-prev-id";
import { canReceiveDrop } from "../can-receive-drop";
import type { Util } from "./types";

// The drop area represents where the block will be dropped.
// Given an id, the drop will occur as a children of it.
export const getDropAreas: Util = ({
	id,
	parent_id,
	ancestor_ids,
	ids_visible,
	moving_block,
}) => {
	const { getBlockIndex, getBlockOrder } = select("core/block-editor");
	const drop_areas: DropArea[] = [];

	if (!moving_block) {
		return drop_areas;
	}

	let prev_id = getPrevId(id, ids_visible);

	// If there is no previous id, it is the first block in the list
	if (!prev_id) {
		// If the moving block is the first block in the list
		if (moving_block.id === ids_visible[0]) {
			return drop_areas;
		}

		return [
			{
				index: 0,
				level: 0,
				id: "",
			},
		];
	}

	let children_index = 0;
	let prev_level = getAncestorIds(prev_id).length - ancestor_ids.length;

	while (prev_level >= -1) {
		children_index =
			prev_level === -1
				? getBlockIndex(id, parent_id)
				: getBlockOrder(prev_id).length;

		if (
			canReceiveDrop({
				children_index,
				id: prev_id,
				moving_block,
			})
		) {
			drop_areas.push({
				id: prev_id,
				level: prev_level + 1,
				index: children_index,
			});
		}

		prev_id = getParentId(prev_id) || "";
		prev_level -= 1;
	}

	return drop_areas.reverse();
};
