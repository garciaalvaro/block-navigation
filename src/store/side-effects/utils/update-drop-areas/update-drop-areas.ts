import { useSelect, useDispatch, select } from "@wordpress/data";
import { useLayoutEffect } from "@wordpress/element";

import { store_slug } from "@/store";
import type { BlockId, DropArea } from "@/types";

export const updateDropAreas = (): void => {
	const moving_block = useSelect(select => select(store_slug).moving_block());

	const ids_visible = useSelect(select => select(store_slug).ids_visible());

	const { dropAreasUpdate } = useDispatch(store_slug);

	useLayoutEffect(() => {
		if (!moving_block || !ids_visible.length) {
			dropAreasUpdate([]);
			return;
		}

		const moving_block_siblings_id = select(
			"core/block-editor"
		).getBlockOrder(moving_block.parent_id);

		const moving_block_index = moving_block_siblings_id.findIndex(
			id => id === moving_block.id
		);

		let moving_block_next_sibling_id: BlockId | null = null;

		if (
			moving_block_index !== -1 &&
			moving_block_siblings_id[moving_block_index + 1]
		) {
			moving_block_next_sibling_id =
				moving_block_siblings_id[moving_block_index + 1];
		}

		const canReceiveDropChildren = (id: BlockId) => {
			const { canInsertBlockType } = select("core/block-editor");

			const can_receive_drop_children = moving_block.name
				? canInsertBlockType(moving_block.name, id)
				: false;

			return can_receive_drop_children;
		};

		const canReceiveDropSibling = (
			id: BlockId,
			ancestors_id: BlockId[]
		) => {
			const { canInsertBlockType, getTemplateLock } =
				select("core/block-editor");

			const parent_id = ancestors_id.slice(-1)[0] || "";

			const parent_template_lock = getTemplateLock(parent_id);

			const ancestor_is_moving = ancestors_id.includes(moving_block.id);

			const can_receive_drop_sibling = moving_block.name
				? canInsertBlockType(moving_block.name, parent_id) &&
				  !ancestor_is_moving &&
				  parent_template_lock !== "all" &&
				  parent_template_lock !== null &&
				  moving_block.id !== id &&
				  moving_block_next_sibling_id !== id
				: false;

			if (!can_receive_drop_sibling) {
				console.log({ can_receive_drop_sibling, parent_id, id });
			}
			return can_receive_drop_sibling;
		};

		const { drop_areas } = ids_visible.reduce<{
			drop_areas: DropArea[];
			pending: DropArea[];
		}>(
			(acc, id, index) => {
				const { getBlockParents, getBlockIndex } =
					select("core/block-editor");

				const ancestors_id: BlockId[] = getBlockParents(id);
				const level = ancestors_id.length;
				const can_receive_drop_children = canReceiveDropChildren(id);

				if (can_receive_drop_children) {
					acc.drop_areas.push({
						index: 0,
						parent_id: id,
						level: level + 1,
					});
				}

				const can_receive_drop_sibling = canReceiveDropSibling(
					id,
					ancestors_id
				);

				if (!can_receive_drop_sibling) {
					return acc;
				}

				const parent_id = ancestors_id.slice(-1)[0] || "";
				const block_index = getBlockIndex(id, parent_id);

				const next_id = ids_visible[index + 1] || null;
				const next_level: number = getBlockParents(next_id).length;

				const sibling_drop_area: DropArea = {
					index: block_index,
					parent_id,
					level,
				};

				// If it's the last block or
				// the next block is a sibling.
				if (!next_id || level > next_level) {
					acc.drop_areas.push(sibling_drop_area);

					const pending = acc.pending.reverse();
					const prev_drop_areas: DropArea[] = [];

					for (const drop_area of pending) {
						if (drop_area.level >= next_level) {
							prev_drop_areas.push(drop_area);
							pending.pop();
						}

						if (drop_area.level <= next_level) {
							break;
						}
					}

					acc.drop_areas.push(...prev_drop_areas.reverse());
					acc.pending = pending.reverse();
				} else {
					acc.pending.push(sibling_drop_area);
				}

				return acc;
			},
			{ drop_areas: [], pending: [] }
		);

		dropAreasUpdate(drop_areas);
	}, [moving_block]);
};
