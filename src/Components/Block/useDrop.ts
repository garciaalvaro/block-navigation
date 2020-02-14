import { useSelect, useDispatch, select } from "@wordpress/data";

import { store_slug } from "utils/data";
import { getBlockAncestorsId } from "utils/tools";

interface Props {
	parent_id: BlockId;
	drop_areas: DropArea[];
	block_div: null | HTMLDivElement;
}

export const useDrop = (props: Props) => {
	const { parent_id, block_div, drop_areas } = props;

	const { moveBlockToPosition } = useDispatch("core/block-editor");

	const moving_block = useSelect<State["moving_block"]>(select =>
		select(store_slug).getMovingBlock()
	);

	const onDrop = (e: React.DragEvent) => {
		if (!moving_block || !drop_areas.length || !block_div) return;

		const left = block_div.getBoundingClientRect().left;

		const drop_level = Math.floor((e.pageX - left) / 20);

		const drop_area = drop_areas
			.reverse()
			.find(({ level }) => level <= drop_level);

		if (!drop_area) return;

		const drop_block_id = drop_area.id;

		const drop_block_ancestors_id = getBlockAncestorsId(drop_block_id);

		const drop_block_level = drop_block_ancestors_id.length;

		const drop_block_parent_id = drop_block_ancestors_id.length
			? drop_block_ancestors_id[drop_block_ancestors_id.length - 1]
			: "";

		let drop_block_index = select("core/block-editor").getBlockIndex(
			drop_block_id,
			drop_block_parent_id
		);

		drop_block_index =
			drop_block_parent_id === parent_id
				? drop_block_index
				: drop_block_index + 1;

		if (drop_area.level > drop_block_level) {
			const drop_block_children_length = select(
				"core/block-editor"
			).getBlockOrder(drop_block_id).length;

			moveBlockToPosition(
				moving_block.id,
				moving_block.parent_id,
				drop_block_id,
				drop_block_children_length || 0
			);
		} else {
			moveBlockToPosition(
				moving_block.id,
				moving_block.parent_id,
				drop_block_parent_id,
				moving_block.parent_id === drop_block_parent_id &&
					moving_block.index_local < drop_block_index
					? drop_block_index - 1
					: drop_block_index
			);
		}
	};

	return onDrop;
};
