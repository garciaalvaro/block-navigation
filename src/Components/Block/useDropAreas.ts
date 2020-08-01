import { useSelect, select } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";

import { getBlockAncestorsId } from "@/utils/tools";

interface Props {
	id: BlockId;
	block_ids: BlockId[];
	index_global: number;
	ancestors_id: BlockId[];
}

export const useDropAreas = (props: Props): DropArea[] => {
	const { id, block_ids, index_global, ancestors_id } = props;

	const [drop_areas, setDropAreas] = useState<DropArea[]>([]);

	const blocks_collapsed = useSelect(select =>
		select("melonpan/block-navigation").getBlocksCollapsed()
	);

	const moving_block = useSelect(select =>
		select("melonpan/block-navigation").getMovingBlock()
	);

	const ancestor_is_moving =
		moving_block && ancestors_id.includes(moving_block.id);

	const is_moving = moving_block && moving_block.id === id;

	const level = ancestors_id.length;

	const parent_id = level > 0 ? ancestors_id[ancestors_id.length - 1] : "";

	useEffect(() => {
		if (!moving_block) return;

		const { canInsertBlockType, getTemplateLock, getBlockOrder } = select(
			"core/block-editor"
		);

		const moving_block_next_sibling_same_level_id = block_ids
			.slice(moving_block.index_global + 1)
			.reduce<{ id: BlockId; level_changed: boolean }>(
				(acc, id) => {
					if (acc.id || acc.level_changed) {
						return acc;
					}

					const block_level = getBlockAncestorsId(id).length;

					if (block_level < moving_block.level) {
						return { ...acc, level_changed: true };
					}

					if (block_level === moving_block.level) {
						return { ...acc, id };
					}

					return acc;
				},
				{ id: "", level_changed: false }
			).id;

		setDropAreas(() => {
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

			const block_prev = block_ids[index_global - 1];

			if (!block_prev) {
				return drop_areas;
			}

			const block_prev_ancestors_id = getBlockAncestorsId(block_prev);

			const block_prev_level = block_prev_ancestors_id.length;

			if (block_prev && block_prev_level >= level) {
				const drop_areas_prev_id = [
					...block_prev_ancestors_id.slice(level),
					block_prev,
				];

				const drop_areas_prev = drop_areas_prev_id.reduce<DropArea[]>(
					(ids, id) => {
						const block = block_ids.find(prev_id => prev_id === id);

						if (!block) return ids;

						const ancestors_id = getBlockAncestorsId(id);

						const level = ancestors_id.length;

						const is_moving = moving_block.id === id;

						const ancestor_is_moving = ancestors_id.includes(
							moving_block.id
						);

						const is_collapsed = blocks_collapsed.includes(id);

						const template_lock = getTemplateLock(id);

						const can_receive_drop_children =
							canInsertBlockType(moving_block.name, id) &&
							template_lock !== "all" &&
							template_lock !== null;

						const children_length = getBlockOrder(id).length;

						const moving_is_next_sibling =
							moving_block.parent_id === id &&
							moving_block.index_local === children_length - 1;

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

			return drop_areas;
		});
	}, [moving_block]);

	return drop_areas;
};
