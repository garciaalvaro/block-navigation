import { select } from "@wordpress/data";

import type { GetDescendantIds } from "./types";

export const getDescendantIds: GetDescendantIds = (id = "") => {
	const ids: BlockId[] = id ? [id] : [];

	const children_id: BlockId[] =
		select("core/block-editor").getBlockOrder(id);

	if (children_id) {
		const descendants_id = children_id.flatMap(children_id =>
			getDescendantIds(children_id)
		);

		ids.push(...descendants_id);
	}

	return ids;
};
