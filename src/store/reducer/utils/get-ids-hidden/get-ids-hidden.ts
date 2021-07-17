import { uniq } from "lodash";

import type { GetIdsHidden } from "./types";
import { getDescendantIds } from "@/utils";

export const getIdsHidden: GetIdsHidden = ids_collapsed => {
	if (!ids_collapsed.length) {
		return [];
	}

	const ids = ids_collapsed.flatMap(id => getDescendantIds(id));

	return uniq(ids);
};
