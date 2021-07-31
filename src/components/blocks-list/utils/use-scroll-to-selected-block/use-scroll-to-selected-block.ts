import { useLayoutEffect } from "@wordpress/element";
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

	useLayoutEffect(() => {
		if (
			!ids_visible.length ||
			!$container.current ||
			(!selected_blocks.length && !selected_block)
		) {
			return;
		}

		const block_height = is_detached ? 39 : 52;
		let block_offsetTop = 0;

		ids_visible.every(id => {
			// TODO If block is collapsed, scroll to closest ancestor
			if ([selected_block, ...selected_blocks].includes(id)) {
				return false;
			}

			block_offsetTop += block_height;

			return true;
		});

		const is_above = block_offsetTop - $container.current.scrollTop < 0;
		const is_below =
			block_offsetTop + block_height - $container.current.scrollTop >
			$container.current.offsetHeight;

		if (is_above || is_below) {
			// eslint-disable-next-line no-param-reassign
			$container.current.scrollTop = block_offsetTop - block_height / 2;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected_blocks, selected_block]);
};
