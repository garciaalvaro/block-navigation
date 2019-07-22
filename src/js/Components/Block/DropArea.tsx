import { Div } from "utils/components";
import { pr_store } from "utils/data/plugin";

type withSelectProps = {
	moving_block: State["moving_block"];
};

type withDispatchProps = {
	moveBlockToPosition: Function;
	finishMoving: Function;
};

type ParentProps = {
	// can_receive_drop: boolean;
	parent_id: string;
	index: number;
	toggleMovingIsOver: Function;
	cancelMovingIsOver: Function;
};

type Props = withSelectProps &
	withDispatchProps &
	ParentProps & { setState(obj: any): void };

const { withSelect, withDispatch } = wp.data;
const { compose } = wp.compose;

export const DropArea = compose([
	withSelect<withSelectProps>(select => ({
		moving_block: select(pr_store).getMovingBlock()
	})),
	withDispatch<withDispatchProps>(dispatch => ({
		moveBlockToPosition: dispatch("core/block-editor").moveBlockToPosition,
		finishMoving: dispatch(pr_store).finishMoving
	}))
])((props: Props) => {
	const {
		finishMoving,
		moveBlockToPosition,
		moving_block,
		index,
		parent_id,
		// can_receive_drop,
		toggleMovingIsOver,
		cancelMovingIsOver
	} = props;

	return (
		<Div
			classes="block-drop_area"
			onDragEnter={toggleMovingIsOver}
			onDragLeave={toggleMovingIsOver}
			onDrop={() => {
				cancelMovingIsOver();
				finishMoving();

				// if (can_receive_drop) {
				moveBlockToPosition(
					moving_block.id,
					moving_block.parent_id,
					parent_id,
					moving_block.parent_id === parent_id && moving_block.index < index
						? index - 1
						: index
				);
				// }
			}}
		/>
	);
});
