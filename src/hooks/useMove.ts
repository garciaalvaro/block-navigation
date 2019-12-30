import { useSelect, useDispatch } from "@wordpress/data";
import { useState } from "@wordpress/element";

import { store_slug } from "utils/data";

interface Props
	extends Pick<BlockProps, "can_receive_drop" | "parent_id" | "index"> {}

export const useMove = (props: Props) => {
	const { can_receive_drop, parent_id, index } = props;
	const [moving_is_over, setMovingIsOver] = useState(false);

	const moving_block = useSelect<State["moving_block"]>(select =>
		select(store_slug).getMovingBlock()
	);
	const { moveBlockToPosition } = useDispatch("core/block-editor");
	const { resetMoving } = useDispatch(store_slug) as Pick<
		ActionCreators,
		"resetMoving"
	>;

	const toggleMovingIsOver = () => setMovingIsOver(is_over => !is_over);

	const moveBlock = () => {
		setMovingIsOver(false);
		resetMoving();

		if (can_receive_drop) {
			moveBlockToPosition(
				moving_block.id,
				moving_block.parent_id,
				parent_id,
				moving_block.parent_id === parent_id && moving_block.index < index
					? index - 1
					: index
			);
		}
	};

	return { moving_is_over, toggleMovingIsOver, moveBlock };
};
