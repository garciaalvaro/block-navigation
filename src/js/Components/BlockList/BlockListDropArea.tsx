import { pr_store } from "utils/data/plugin";
import { Div } from "utils/components";
import { withMove, WithMoveProps } from "utils/HOC/withMove";

interface WithSelectProps {
	moving_type: ReturnType<Selectors["getMovingType"]>;
}

type OwnProps = {
	parent_id: string;
	level: number;
	index: number;
	can_receive_drop: true;
};

type Props = WithMoveProps & WithSelectProps & OwnProps;

const { withSelect } = wp.data;
const { compose } = wp.compose;

export const BlockListDropArea: React.ComponentType<OwnProps> = compose([
	withSelect<WithSelectProps>(select => ({
		moving_type: select(pr_store).getMovingType()
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
			classes={[
				"block_list_drop_area",
				`level-${level}`,
				"no-is_moving",
				"can_receive_drop",
				`${moving_is_over ? "" : "no-"}moving_is_over`
			]}
		/>
	);
});
