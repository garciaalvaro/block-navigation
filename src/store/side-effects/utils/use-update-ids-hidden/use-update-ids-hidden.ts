import { uniq } from "lodash";
import { useSelect, useDispatch } from "@wordpress/data";
import { useLayoutEffect } from "@wordpress/element";

import { getDescendantIds } from "@/utils";
import { store_slug } from "@/store";

export const useUpdateIdsHidden = (): void => {
	const ids_collapsed = useSelect(select =>
		select(store_slug).ids_collapsed()
	);

	const { idsHiddenUpdate } = useDispatch(store_slug);

	useLayoutEffect(() => {
		if (!ids_collapsed.length) {
			idsHiddenUpdate([]);
			return;
		}

		let ids_hidden = ids_collapsed.flatMap(id =>
			// Get the id of the collapsed block descendants
			// but exclude the collapsed block id.
			getDescendantIds(id).slice(1)
		);

		ids_hidden = uniq(ids_hidden);

		idsHiddenUpdate(ids_hidden);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ids_collapsed]);
};
