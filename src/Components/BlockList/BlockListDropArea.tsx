import { useSelect } from "@wordpress/data";

import { store_slug } from "utils/data";
import { Div } from "utils/Components";
import { useMove } from "../../hooks/useMove";

interface Props
	extends Pick<
		BlockProps,
		"index" | "parent_id" | "level" | "can_receive_drop"
	> {}

export const BlockListDropArea: React.ComponentType<Props> = props => {
	const { level, can_receive_drop, parent_id, index } = props;

	const moving_type = useSelect<State["moving_type"]>(select =>
		select(store_slug).getMovingType()
	);

	const { moving_is_over, toggleMovingIsOver, moveBlock } = useMove({
		can_receive_drop,
		parent_id,
		index
	});

	return (
		<Div
			onDragEnter={toggleMovingIsOver}
			onDragLeave={toggleMovingIsOver}
			onDrop={moveBlock}
			onClick={moving_type !== "by_click" ? null : moveBlock}
			className={[
				"block_list_drop_area",
				`level-${level}`,
				"no-is_moving",
				"can_receive_drop",
				`${moving_is_over ? "" : "no-"}moving_is_over`
			]}
		/>
	);
};
