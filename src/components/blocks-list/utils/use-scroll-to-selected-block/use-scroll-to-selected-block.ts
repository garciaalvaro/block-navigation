import { useLayoutEffect, useMemo } from "@wordpress/element";
import { useSelect } from "@wordpress/data";

import { store_slug } from "@/store";

import type { Util } from "./types";

export const useScrollToSelectedBlock: Util = $container => {
	const ids_visible = useSelect(select => select(store_slug).ids_visible());

	const is_detached = useSelect(select => select(store_slug).is_detached());

	const selected_blocks = useSelect(select =>
		select("core/block-editor").getSelectedBlockClientIds()
	);

	const selected_block = useSelect(select =>
		select("core/block-editor").getSelectedBlockClientId()
	);

	const offset_top = useMemo(() => {
		const selected = [selected_block, ...selected_blocks];

		const block_index = ids_visible.findIndex(id => selected.includes(id));

		if (block_index === -1) {
			return null;
		}

		const block_height = is_detached ? 39 : 52;

		return block_index * block_height;

		// ids_visible is not included to prevent scrolling when ids
		// change but the selected block did not, for example when
		// a block collapses but a different one is selected.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [is_detached, `${selected_blocks}`, selected_block]);

	useLayoutEffect(() => {
		if (offset_top === null || !$container.current) return;

		const block_height = is_detached ? 39 : 52;

		const is_above = offset_top - $container.current.scrollTop < 0;

		const is_below =
			offset_top + block_height - $container.current.scrollTop >
			$container.current.offsetHeight;

		if (!is_above && !is_below) return;

		// eslint-disable-next-line no-param-reassign
		$container.current.scrollTop = Math.max(
			0,
			offset_top - block_height / 2
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [offset_top]);
};
