import { select } from "@wordpress/data";

import type { Util } from "./types";

export const getParentId: Util = id => {
	const parent_id = select("core/block-editor").getBlockRootClientId(id);

	return parent_id;
};
