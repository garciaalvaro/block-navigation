import { useSelect, select, useDispatch } from "@wordpress/data";
import { useLayoutEffect } from "@wordpress/element";

import { store_slug } from "@/store";
import type { BlockId } from "@/types";

export const useUpdateIdsRootCollapsible = (): void => {
	const root_ids = useSelect(_select =>
		_select("core/block-editor").getBlockOrder("")
	);

	const { idsRootCollapsibleUpdate } = useDispatch(store_slug);

	useLayoutEffect(() => {
		const { getBlockOrder } = select("core/block-editor");

		const ids = root_ids.reduce<BlockId[]>((acc, id) => {
			if (getBlockOrder(id).length > 0) {
				return [...acc, id];
			}

			return acc;
		}, []);

		idsRootCollapsibleUpdate(ids);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [root_ids]);
};
