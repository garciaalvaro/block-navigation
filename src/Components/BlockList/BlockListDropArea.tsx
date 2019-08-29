import { store_prefix } from "utils/data";
import { Div } from "utils/Components";
import { withMove, WithMoveProps } from "../HOC/withMove";

interface WithSelectProps extends Pick<State, "moving_type"> {}

interface OwnProps
	extends Pick<
		BlockProps,
		"index" | "parent_id" | "level" | "can_receive_drop"
	> {}

interface Props extends WithMoveProps, WithSelectProps, OwnProps {}

const { withSelect } = wp.data;
const { compose } = wp.compose;

export const BlockListDropArea: React.ComponentType<OwnProps> = compose([
	withSelect<WithSelectProps>(select => ({
		moving_type: select(store_prefix).getMovingType()
	})),
	withMove
])((props: Props) => {
	const {
		moving_is_over,
		toggleMovingIsOver,
		moveBlock,
		moving_type,
		level
	} = props;

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
});
