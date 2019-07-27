import { pr_store } from "utils/data/plugin";

export interface WithMoveProps {
	moving_is_over: boolean;
	toggleMovingIsOver: Function;
	moveBlock: Function;
}

interface WithStateProps {
	moving_is_over: boolean;
}

interface WithDispatchProps extends Pick<ActionCreators, "resetMoving"> {
	moveBlockToPosition: typeof import("wordpress__block-editor/store/actions").moveBlockToPosition;
}

interface WithSelectProps extends Pick<State, "moving_block"> {}

interface OwnProps
	extends Pick<BlockProps, "can_receive_drop" | "parent_id" | "index"> {}

const { withDispatch, withSelect } = wp.data;
const { compose, withState } = wp.compose;

const withMoveHOC = (
	Component: React.ComponentType<OwnProps & WithMoveProps>
) => (
	props: OwnProps &
		WithSelectProps &
		WithDispatchProps &
		WithStateProps &
		SetStateProp
) => {
	const { resetMoving, moveBlockToPosition, ...rest } = props;
	const {
		moving_block,
		moving_is_over,
		setState,
		can_receive_drop,
		parent_id,
		index
	} = rest;

	return (
		<Component
			{...rest}
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

export const withMove = compose(
	withState<WithStateProps>({ moving_is_over: false }),
	withDispatch<WithDispatchProps>(dispatch => ({
		moveBlockToPosition: dispatch("core/block-editor").moveBlockToPosition,
		resetMoving: dispatch(pr_store).resetMoving
	})),
	withSelect<WithSelectProps>(select => ({
		moving_block: select(pr_store).getMovingBlock()
	})),
	withMoveHOC
);
