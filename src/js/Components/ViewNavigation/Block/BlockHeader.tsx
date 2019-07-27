import { Div, Span, Button, Icon } from "utils/components";
import { pr_store } from "utils/data/plugin";
import { BlockContent } from "./BlockContent";
import { ButtonMenu } from "./ButtonMenu";

interface WithDispatchProps
	extends Pick<
		ActionCreators,
		"setMovingType" | "setMovingBlock" | "resetMoving"
	> {
	selectBlock: Function;
	moveBlockToPosition: Function;
}

interface WithStateProps {
	was_open: boolean;
}

interface OwnProps
	extends Pick<
		BlockProps,
		"index" | "template_lock" | "id" | "parent_id" | "block_type" | "is_open"
	> {
	block: Block;
	can_move: boolean;
	has_children: boolean;
	toggle: Function;
	close: Function;
	open: Function;
}

interface Props
	extends WithDispatchProps,
		WithStateProps,
		SetStateProp,
		OwnProps {}

const { compose, withState } = wp.compose;
const { withDispatch } = wp.data;
const WpIcon = wp.components.Icon;

export const BlockHeader: React.ComponentType<OwnProps> = compose([
	withDispatch<WithDispatchProps>(dispatch => ({
		setMovingType: dispatch(pr_store).setMovingType,
		setMovingBlock: dispatch(pr_store).setMovingBlock,
		resetMoving: dispatch(pr_store).resetMoving,
		selectBlock: dispatch("core/block-editor").selectBlock,
		moveBlockToPosition: dispatch("core/block-editor").moveBlockToPosition
	})),
	withState<WithStateProps>({
		was_open: true
	})
])((props: Props) => {
	const {
		id,
		has_children,
		is_open,
		selectBlock,
		toggle,
		index,
		block,
		block_type,
		close,
		open,
		was_open,
		setState,
		can_move,
		parent_id,
		template_lock,
		setMovingBlock,
		resetMoving,
		setMovingType
	} = props;
	const title = block_type ? block_type.title : block.name;
	const icon: BlockType["icon"] = block_type
		? block_type.icon
		: { src: () => null };

	return (
		<Div classes="block-header-container">
			<Div
				classes="block-header"
				onClick={() => selectBlock(block.clientId)}
				draggable={can_move}
				onDragEnd={
					!can_move
						? null
						: (e: React.DragEvent) => {
								if (was_open) {
									open();
								}

								resetMoving();
						  }
				}
				onDragStart={
					!can_move
						? null
						: (e: React.DragEvent) => {
								if (e.dataTransfer && e.dataTransfer.setData) {
									// Needed for Firefox to work.
									// https://stackoverflow.com/a/33465176 | CC BY-SA 3.0
									e.dataTransfer.setData("text", "");
								}

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
				<Span classes="block-title">{title}</Span>
				<BlockContent block={block} />
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
});
