import { select } from "@wordpress/data";

import { getPrevId } from "../get-prev-id";
import { canReceiveDrop } from "../can-receive-drop";
import type { Util } from "./types";
import type { DropArea } from "@/types";
import { getAncestorsId, getParentId } from "@/utils";

// The drop area represents where the block will be dropped.
// Given an id, the drop will occur as a children of it.
export const getDropAreas: Util = ({
	id,
	parent_id,
	ancestors_id,
	ids_visible,
	moving_block,
}) => {
	const { getBlockIndex, getBlockOrder } = select("core/block-editor");
	const drop_areas: DropArea[] = [];

	if (!moving_block) {
		return drop_areas;
	}

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

	let children_index = 0;
	let prev_level = getAncestorsId(prev_id).length - ancestors_id.length;

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
				ids_visible,
			})
		) {
			drop_areas.push({
				id: prev_id,
				level: prev_level + 1,
				index: children_index,
			});
		}

		prev_id = getParentId(prev_id) || "";
		prev_level = prev_level - 1;
	}

	return drop_areas.reverse();
};
