import { select } from "@wordpress/data";

import type { BlockId } from "@/types";

import type { Util } from "./types";
import { getParentId } from "../get-parent-id";

export const getAncestorIds: Util = id => {
	// @ts-expect-error TODO
	const { getBlockParents } = select("core/block-editor");

	if (getBlockParents) {
		return getBlockParents(id);
	}

	let parent_id: BlockId | null = id;

	const ancestor_ids = [];

	while (parent_id) {
		parent_id = getParentId(parent_id);

		if (parent_id) {
			ancestor_ids.unshift(parent_id);
		}
	}

	return ancestor_ids;
};
