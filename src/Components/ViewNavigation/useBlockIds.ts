import { useSelect, select } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";

import { store_slug } from "utils/data";
import { getBlockAncestorsId } from "utils/tools";

export const useBlockIds = () => {
	const [blocks_id, setBlocksId] = useState<BlockId[]>([]);

	const blocks_collapsed = useSelect<State["blocks_collapsed"]>(select =>
		select(store_slug).getBlocksCollapsed()
	);

	const blocks_id_raw = useSelect(select =>
		select("core/block-editor").getClientIdsWithDescendants()
	);

	useEffect(() => {
		const getBlocksId = (blocks_id: BlockId[]): BlockId[] =>
			blocks_id.reduce<BlockId[]>((ids, id) => {
				const ancestors_id = getBlockAncestorsId(id);

				const has_collapsed_ancestor = ancestors_id.find(id =>
					blocks_collapsed.includes(id)
				);

				if (has_collapsed_ancestor) {
					return ids;
				}

				const children_ids = getBlocksId(
					select("core/block-editor").getBlockOrder(id)
				);

				return [...ids, id, ...children_ids];
			}, []);

		const root_blocks_id = select("core/block-editor").getBlockOrder();

		const blocks_id = getBlocksId(root_blocks_id);

		setBlocksId(blocks_id);
	}, [blocks_id_raw, blocks_collapsed]);

	return blocks_id;
};
