import { uniq } from "lodash";
import { useSelect, useDispatch } from "@wordpress/data";
import { useLayoutEffect } from "@wordpress/element";

import { getDescendantIds } from "@/utils";
import { store_slug } from "@/store";

export const updateIdsHidden = (): void => {
	const ids_collapsed = useSelect(select =>
		select(store_slug).ids_collapsed()
	);

	const { idsHiddenUpdate } = useDispatch(store_slug);

	useLayoutEffect(() => {
		if (!ids_collapsed.length) {
			idsHiddenUpdate([]);
			return;
		}

		let ids_hidden = ids_collapsed.flatMap(id => getDescendantIds(id));
		ids_hidden = uniq(ids_hidden);

		idsHiddenUpdate(ids_hidden);
	}, [ids_collapsed]);
};
