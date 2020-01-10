import { useSelect, select } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";

import { store_slug } from "utils/data";
import { getBlockAncestorsId } from "utils/tools";

export const useBlocks = () => {
	const [blocks, setBlocks] = useState<BlockDropArea[]>([]);

	const blocks_collapsed = useSelect<State["blocks_collapsed"]>(select =>
		select(store_slug).getBlocksCollapsed()
	);

	const blocks_id = useSelect(select =>
		select("core/block-editor").getClientIdsWithDescendants()
	);

	const moving_block = useSelect<State["moving_block"]>(select =>
		select(store_slug).getMovingBlock()
	);

	useEffect(() => {
		const getBlocksId = (blocks_id: BlockId[]): BlockDropArea[] =>
			blocks_id.reduce<BlockDropArea[]>((blocks, id) => {
				const ancestors_id = getBlockAncestorsId(id);

				const has_collapsed_ancestor = ancestors_id.find(id =>
					blocks_collapsed.includes(id)
				);

				if (has_collapsed_ancestor) return blocks;

				const children = getBlocksId(
					select("core/block-editor").getBlockOrder(id)
				);

				return [...blocks, { id, drop_areas: [] }, ...children];
			}, []);

		const root_blocks_id = select("core/block-editor").getBlockOrder();

		const blocks = getBlocksId(root_blocks_id);

		setBlocks(blocks);
	}, [blocks_id, blocks_collapsed]);

	useEffect(() => {
		if (!moving_block) return;

		const { canInsertBlockType, getTemplateLock, getBlockOrder } = select(
			"core/block-editor"
		);

		const moving_block_index_global = blocks.findIndex(
			({ id }) => id === moving_block.id
		);

		let moving_block_next_sibling_same_level_id = "";

		for (const { id } of blocks.slice(moving_block_index_global + 1)) {
			const block_level = getBlockAncestorsId(id).length;

			if (block_level < moving_block.level) break;

			if (block_level === moving_block.level) {
				moving_block_next_sibling_same_level_id = id;

				break;
			}
		}

		setBlocks(blocks_old =>
			blocks_old.reduce<BlockDropArea[]>((blocks, { id }, index) => {
				const ancestors_id = getBlockAncestorsId(id);

				const level = ancestors_id.length;

				const parent_id =
					level > 0 ? ancestors_id[ancestors_id.length - 1] : "";

				const is_moving = moving_block.id === id;

				const ancestor_is_moving = ancestors_id.includes(moving_block.id);

				const can_receive_drop_sibling = canInsertBlockType(
					moving_block.name,
					parent_id
				);

				// drop_areas will be formed by an array of ids and levels
				// that the current block will use to handle drops.
				// It consists of all the possible drops: itself and
				// the previous blocks children last position.
				const drop_areas: DropArea[] = [];

				if (
					!is_moving &&
					!ancestor_is_moving &&
					can_receive_drop_sibling &&
					(!moving_block_next_sibling_same_level_id ||
						moving_block_next_sibling_same_level_id !== id)
				) {
					drop_areas.push({ id, level });
				}

				const block_prev = index > 0 ? blocks_old[index - 1] : null;

				if (!block_prev) {
					return [...blocks, { id, drop_areas }];
				}

				const block_prev_ancestors_id = getBlockAncestorsId(block_prev.id);

				const block_prev_level = block_prev_ancestors_id.length;

				if (block_prev.id && block_prev_level >= level) {
					const drop_areas_prev_id: BlockId[] = [
						...block_prev_ancestors_id.slice(level),
						block_prev.id
					];

					const drop_areas_prev = drop_areas_prev_id.reduce<DropArea[]>(
						(ids, id) => {
							const block = blocks.find(block => block.id === id);

							if (!block) return ids;

							const ancestors_id = getBlockAncestorsId(id);

							const level = ancestors_id.length;

							const is_moving = moving_block.id === id;

							const ancestor_is_moving = ancestors_id.includes(moving_block.id);

							const is_collapsed = blocks_collapsed.includes(id);

							const template_lock = getTemplateLock(id);

							const can_receive_drop_children =
								canInsertBlockType(moving_block.name, id) &&
								template_lock !== "all" &&
								template_lock !== null;

							const children_length = getBlockOrder(id).length;

							const moving_is_next_sibling =
								moving_block.parent_id === id &&
								moving_block.index === children_length - 1;

							if (
								is_moving ||
								ancestor_is_moving ||
								is_collapsed ||
								!can_receive_drop_children ||
								moving_is_next_sibling
							) {
								return ids;
							}

							return [...ids, { id, level: level + 1 }];
						},
						[]
					);

					drop_areas.push(...drop_areas_prev);
				}

				return [...blocks, { id, drop_areas }];
			}, [])
		);
	}, [moving_block]);

	return blocks;
};
