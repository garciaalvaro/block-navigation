import { select } from "@wordpress/data";

import type { GetAncestorsId } from "./types";
import type { BlockId } from "@/types";

const getParentId = (id: BlockId) =>
	select("core/block-editor").getBlockRootClientId(id);

export const getAncestorsId: GetAncestorsId = id => {
	// @ts-expect-error TODO
	const { getBlockParents } = select("core/block-editor");

	if (getBlockParents) {
		return getBlockParents(id);
	}

	let parent_id: BlockId | null = id;

	const ancestors_id = [];

	while (parent_id) {
		parent_id = getParentId(parent_id);

		if (parent_id) {
			ancestors_id.unshift(parent_id);
		}
	}

	return ancestors_id;
};
