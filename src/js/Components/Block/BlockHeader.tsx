import { Div, Span } from "utils/components";
import { pr_store } from "utils/data/plugin";
import { BlockContent } from "./BlockContent";

type withSelectProps = {
	moving_block: State["moving_block"];
};
type withDispatchProps = {
	setMovingBlock: Function;
	finishMoving: Function;
	moveBlockToPosition: Function;
	selectBlock: Function;
	// setSelectedId: ActionCreators["setSelectedId"];
};
type withStateProps = {
	was_open: boolean;
	setState(obj: any): void;
};
type ParentProps = {
	index: number;
	block: import("wordpress__blocks").BlockInstance;
	block_type: import("wordpress__blocks").Block;
	close: Function;
	open: Function;
	toggleMovingsIsOver: Function;
	can_move: boolean;
	can_receive_drop: boolean;
	template_lock: string | undefined;
	parent_id: string;
};
type Props = withSelectProps & withDispatchProps & withStateProps & ParentProps;

const { compose, withState } = wp.compose;
const { withDispatch, withSelect } = wp.data;
const { Icon } = wp.components;

export const BlockHeader = compose([
	withSelect<withSelectProps, ParentProps>((select, { block }) => ({
		moving_block: select(pr_store).getMovingBlock()
	})),
	withDispatch(dispatch => ({
		setMovingBlock: dispatch(pr_store).setMovingBlock,
		finishMoving: dispatch(pr_store).finishMoving,
		// setSelectedId: dispatch(pr_store).setSelectedId,
		selectBlock: dispatch("core/block-editor").selectBlock,
		moveBlockToPosition: dispatch("core/block-editor").moveBlockToPosition
	})),
	withState({
		was_open: true
	})
])((props => {
	const {
		selectBlock,
		// setSelectedId,
		toggleMovingsIsOver,
		moving_block,
		index,
		block,
		block_type,
		close,
		open,
		was_open,
		setState,
		can_move,
		can_receive_drop,
		parent_id,
		template_lock,
		setMovingBlock,
		finishMoving,
		moveBlockToPosition
	} = props;
	const { title, icon } = block_type;

	return (
		<Div
			classes="block-header"
			onClick={() => {
				selectBlock(block.clientId);
				// setSelectedId(block.clientId);
			}}
			draggable={can_move}
			// onDragEnter={toggleMovingsIsOver}
			// onDragLeave={toggleMovingsIsOver}
			// onDrop={() => {
			// 	toggleMovingsIsOver();

			// 	if (can_receive_drop) {
			// 		moveBlockToPosition(
			// 			moving_block.id,
			// 			moving_block.parent_id,
			// 			parent_id,
			// 			index
			// 		);
			// 	}
			// }}
			onDragEnd={
				!can_move
					? null
					: e => {
							if (was_open) {
								open();
							}

							finishMoving();
					  }
			}
			onDragStart={
				!can_move
					? null
					: e => {
							// if (!lodash.isNil(e.dataTransfer)) {
							// 	// move_type = "by_drag";

							// 	// Needed for Firefox to work.
							// 	// https://stackoverflow.com/a/33465176 | CC BY-SA 3.0
							// 	e.dataTransfer.setData("text", "");
							// }

							setState({ was_open });

							setMovingBlock({
								id: block.clientId,
								parent_id,
								template_lock,
								block_name: block.name,
								index
							});

							close();
					  }
			}
		>
			{icon.src && (
				<Div classes="block-icon">
					<Icon icon={icon.src} />
				</Div>
			)}
			<Span classes="block-title">{title}</Span>
			<BlockContent block={block} />
		</Div>
	);
}) as React.ComponentType<Props>);
