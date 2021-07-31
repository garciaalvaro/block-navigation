import { useSelect, useDispatch } from "@wordpress/data";
import { useLayoutEffect } from "@wordpress/element";

import { store_slug } from "@/store";

export const useUpdateIdsCollapsed = (): void => {
	const ids = useSelect(select => select(store_slug).ids());

	const ids_collapsed = useSelect(select =>
		select(store_slug).ids_collapsed()
	);

	const { idsCollapsedUpdate } = useDispatch(store_slug);

	useLayoutEffect(() => {
		if (!ids) return;

		const ids_collapsed_updated = ids_collapsed.filter(id =>
			ids.includes(id)
		);

		// If a block from ids_collapsed is removed,
		// remove it from the ids_collapsed list.
		idsCollapsedUpdate(ids_collapsed_updated);
		// TODO
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ids]);
};
