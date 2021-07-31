import { select } from "@wordpress/data";

import type { BlockId } from "@/types";

import type { Util } from "./types";

export const getDescendantIds: Util = (id = "") => {
	const ids: BlockId[] = id ? [id] : [];

	const children_id: BlockId[] =
		select("core/block-editor").getBlockOrder(id);

	if (children_id) {
		const descendants_id = children_id.flatMap(_children_id =>
			getDescendantIds(_children_id)
		);

		ids.push(...descendants_id);
	}

	return ids;
};
