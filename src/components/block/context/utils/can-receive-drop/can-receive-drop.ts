import { select } from "@wordpress/data";

import { getAncestorsId } from "@/utils";

import type { Util } from "./types";
import { canHaveChildren } from "../can-have-children";

export const canReceiveDrop: Util = ({ id, children_index, moving_block }) => {
	if (!moving_block) {
		return false;
	}

	const { getBlockIndex } = select("core/block-editor");

	const ancestors_id = getAncestorsId(id);

	const can_have_children = canHaveChildren(id, moving_block);

	const is_moving_block =
		moving_block.id === id ||
		(moving_block.parent_id === id &&
			getBlockIndex(moving_block.id, moving_block.parent_id) ===
				children_index);

	const moving_block_is_ancestor = ancestors_id.includes(moving_block.id);

	const moving_block_is_prev =
		moving_block.parent_id === id &&
		getBlockIndex(moving_block.id, moving_block.parent_id) ===
			children_index - 1;

	const can_receive_drop =
		can_have_children &&
		!moving_block_is_ancestor &&
		!moving_block_is_prev &&
		!is_moving_block;

	return can_receive_drop;
};
