import { Div, Span, Button, Icon } from "utils/components";
import { pr_store } from "utils/data/plugin";
import { BlockContent } from "./BlockContent";
import { ButtonMenu } from "./ButtonMenu";

type withSelectProps = {
	moving_block: State["moving_block"];
};
type withDispatchProps = {
	setMovingType: Function;
	setMovingBlock: Function;
	resetMoving: Function;
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
	// toggleMovingsIsOver: Function;
	can_move: boolean;
	can_receive_drop: boolean;
	template_lock: string | undefined;
	parent_id: string;
};
type Props = withSelectProps & withDispatchProps & withStateProps & ParentProps;

const { compose, withState } = wp.compose;
const { withDispatch, withSelect } = wp.data;
const WpIcon = wp.components.Icon;

export const BlockHeader = compose([
	withSelect<withSelectProps, ParentProps>((select, { block }) => ({
		moving_block: select(pr_store).getMovingBlock()
	})),
	withDispatch(dispatch => ({
		setMovingType: dispatch(pr_store).setMovingType,
		setMovingBlock: dispatch(pr_store).setMovingBlock,
		resetMoving: dispatch(pr_store).resetMoving,
		// setSelectedId: dispatch(pr_store).setSelectedId,
		selectBlock: dispatch("core/block-editor").selectBlock,
		moveBlockToPosition: dispatch("core/block-editor").moveBlockToPosition
	})),
	withState({
		was_open: true
	})
])((props => {
	const {
		id,
		has_children,
		is_open,
		selectBlock,
		// setSelectedId,
		toggle,
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
		resetMoving,
		setMovingType
	} = props;
	const { title, icon } = block_type;

	return (
		<Div classes="block-header-container">
			<Div
				classes="block-header"
				onClick={() => {
					selectBlock(block.clientId);
				}}
				draggable={can_move}
				onDragEnd={
					!can_move
						? null
						: e => {
								if (was_open) {
									open();
								}

								resetMoving();
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

								setMovingType("by_drag");

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
						<WpIcon icon={icon.src} />
					</Div>
				)}
				<Div classes="block-text">
					<Span classes="block-title">{title}</Span>
					<BlockContent block={block} />
				</Div>
				{has_children && (
					<Button
						classes={["button-icon", "button-toggle_list"]}
						onClick={(e: any) => {
							e.stopPropagation();

							toggle();
						}}
					>
						<Icon icon={is_open ? "collapse" : "expand"} />
					</Button>
				)}
				<ButtonMenu
					id={id}
					parent_id={parent_id}
					template_lock={template_lock}
					block={block}
					block_type={block_type}
					can_move={can_move}
					index={index}
					close_children={close}
				/>
			</Div>
		</Div>
	);
}) as React.ComponentType<Props>);
