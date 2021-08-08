import { uniq } from "lodash";
import { useSelect, useDispatch } from "@wordpress/data";
import { useLayoutEffect } from "@wordpress/element";

import { store_slug } from "@/store";
import { getDescendantIds } from "@/utils";

export const useUpdateIdsVisible = (): void => {
	const ids = useSelect(select => select(store_slug).ids());

	const ids_collapsed = useSelect(select =>
		select(store_slug).ids_collapsed()
	);

	const { idsVisibleUpdate } = useDispatch(store_slug);

	useLayoutEffect(() => {
		if (!ids) return;

		if (!ids_collapsed.length) {
			idsVisibleUpdate(ids);
			return;
		}

		let ids_hidden = ids_collapsed.flatMap(id =>
			// Get the id of the collapsed block descendants
			// but exclude the collapsed block id.
			getDescendantIds(id).slice(1)
		);

		ids_hidden = uniq(ids_hidden);

		if (!ids_hidden.length) {
			idsVisibleUpdate(ids);
			return;
		}

		const ids_visible = ids.filter(id => !ids_hidden.includes(id));

		idsVisibleUpdate(ids_visible);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ids, ids_collapsed]);
};
