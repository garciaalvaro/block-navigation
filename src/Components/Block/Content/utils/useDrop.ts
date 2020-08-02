import { useSelect, useDispatch, select } from "@wordpress/data";

import { getAncestorsId } from "@/utils/tools";
import { store_slug } from "@/utils/data";

interface Props {
	parent_id: BlockId;
	drop_areas: DropArea[];
	$block: null | HTMLDivElement;
}

type OnDrop = (pageX: React.MouseEvent["pageX"]) => void;

export const useDrop = (props: Props): OnDrop => {
	const { parent_id, $block, drop_areas } = props;

	const { moveBlockToPosition } = useDispatch("core/block-editor");

	const moving_block = useSelect(select =>
		select(store_slug).getMovingBlock()
	);

	const onDrop: OnDrop = pageX => {
		if (!moving_block || !drop_areas.length || !$block) return;

		const left = $block.getBoundingClientRect().left;

		const drop_level = Math.floor((pageX - left) / 20);

		const drop_area = drop_areas
			.reverse()
			.find(({ level }) => level <= drop_level);

		if (!drop_area) return;

		const drop_block_id = drop_area.id;

		const drop_block_ancestors_id = getAncestorsId(drop_block_id);

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
