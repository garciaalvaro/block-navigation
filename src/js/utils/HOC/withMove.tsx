import { pr_store } from "utils/data/plugin";

export type WithMoveProps = {
	moving_is_over: boolean;
	toggleMovingIsOver: Function;
	moveBlock: Function;
};

interface WithStateProps {
	moving_is_over: boolean;
}

interface WithDispatchProps {
	moveBlockToPosition: Function;
	resetMoving: Function;
}

interface WithSelectProps {
	moving_block: ReturnType<Selectors["getMovingBlock"]>;
}

type OwnProps = {
	can_receive_drop: boolean;
	parent_id: string;
	index: number;
};

type Props = OwnProps &
	WithStateProps &
	SetStateProp &
	WithDispatchProps &
	WithSelectProps &
	SetStateProp;

const { withDispatch, withSelect } = wp.data;
const { compose, withState } = wp.compose;

const withMoveHOC = (WrappedComponent: React.ComponentType<WithMoveProps>) => (
	props: Props
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
		<WrappedComponent
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

export const withMove: () => React.ComponentType<WithMoveProps> = compose([
	withState<WithStateProps>({ moving_is_over: false }),
	withDispatch<WithDispatchProps>(dispatch => ({
		moveBlockToPosition: dispatch("core/block-editor").moveBlockToPosition,
		resetMoving: dispatch(pr_store).resetMoving
	})),
	withSelect<WithSelectProps>(select => ({
		moving_block: select(pr_store).getMovingBlock()
	})),
	withMoveHOC
]);
