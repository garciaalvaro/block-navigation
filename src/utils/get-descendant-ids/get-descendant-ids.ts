import { select } from "@wordpress/data";

import type { Util } from "./types";
import type { BlockId } from "@/types";

export const getDescendantIds: Util = (id = "") => {
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
