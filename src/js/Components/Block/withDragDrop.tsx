import { pr_store } from "utils/data/plugin";

export type withDragDropProps = {
	moving_is_over: boolean;
	toggleMovingIsOver: Function;
	moveBlock: Function;
};

type withStateProps = {
	moving_is_over: boolean;
};

type withDispatchProps = {
	moveBlockToPosition: Function;
	resetMoving: Function;
};

type ParentProps = {
	can_receive_drop: boolean;
	parent_id: string;
	index: boolean;
	moving_block: State["moving_block"];
};

type Props = ParentProps &
	withStateProps &
	withDispatchProps & { setState(obj: any): void };

const { withDispatch } = wp.data;
const { compose, withState } = wp.compose;

const withDragDropHOC = (
	WrappedComponent: React.ComponentType<withDragDropProps>
) => (props: Props & any) => {
	const {
		resetMoving,
		moveBlockToPosition,
		moving_block,
		moving_is_over,
		setState,
		can_receive_drop,
		parent_id,
		index
	} = props;

	return (
		<WrappedComponent
			{...props}
			moving_is_over={moving_is_over}
			toggleMovingIsOver={() => setState({ moving_is_over: !moving_is_over })}
			moveBlock={() => {
				setState({ moving_is_over: false });
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
			}}
		/>
	);
};

export const withDragDrop = compose([
	withState<withStateProps>({ moving_is_over: false }),
	withDispatch<withDispatchProps>(dispatch => ({
		moveBlockToPosition: dispatch("core/block-editor").moveBlockToPosition,
		resetMoving: dispatch(pr_store).resetMoving
	})),
	withDragDropHOC
]);
