import { useSelect, useDispatch } from "@wordpress/data";
import { useLayoutEffect } from "@wordpress/element";

import { store_slug } from "@/store";

export const updateIdsVisible = (): void => {
	const ids = useSelect(select => select(store_slug).ids());

	const ids_hidden = useSelect(select => select(store_slug).ids_hidden());

	const { idsVisibleUpdate } = useDispatch(store_slug);

	useLayoutEffect(() => {
		if (!ids) return;

		if (!ids_hidden.length) {
			idsVisibleUpdate(ids);
			return;
		}

		const ids_visible = ids.filter(id => !ids_hidden.includes(id));

		idsVisibleUpdate(ids_visible);
	}, [ids, ids_hidden]);
};
