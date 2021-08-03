import type { Util } from "./types";

export const getPrevId: Util = (id, ids) => {
	const current_index = ids.indexOf(id);

	if (current_index === -1 || current_index === 0) {
		return null;
	}

	return ids[current_index - 1];
};
