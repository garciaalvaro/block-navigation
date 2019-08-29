import { Div, Span, Button, Icon } from "utils/Components";
import { store_prefix } from "utils/data";
import { BlockHeaderContent } from "./BlockHeaderContent";
import { ButtonMenu } from "./ButtonMenu";

interface WithDispatchProps
	extends Pick<
		ActionCreators,
		"setMovingType" | "setMovingBlock" | "resetMoving"
	> {
	selectBlock: Function;
	moveBlockToPosition: Function;
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
}

interface Props extends WithDispatchProps, OwnProps {}

const { useCallback } = wp.element;
const { compose } = wp.compose;
const { withDispatch } = wp.data;
const WpIcon = wp.components.Icon;

export const BlockHeader: React.ComponentType<OwnProps> = compose([
	withDispatch<WithDispatchProps>(dispatch => ({
		setMovingType: dispatch(store_prefix).setMovingType,
		setMovingBlock: dispatch(store_prefix).setMovingBlock,
		resetMoving: dispatch(store_prefix).resetMoving,
		selectBlock: dispatch("core/block-editor").selectBlock,
		moveBlockToPosition: dispatch("core/block-editor").moveBlockToPosition
	}))
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
	const buttonOnClick = useCallback((e: any) => {
		e.stopPropagation();

		toggle();
	}, []);
	const onDragStart = useCallback(
		(e: React.DragEvent) => {
			if (e.dataTransfer && e.dataTransfer.setData) {
				// Needed for Firefox to work.
				// https://stackoverflow.com/a/33465176 | CC BY-SA 3.0
				e.dataTransfer.setData("text", "");
			}

			setMovingType("by_drag");

			setTimeout(() => {
				setMovingBlock({
					id: block.clientId,
					parent_id,
					template_lock,
					block_name: block.name,
					index
				});
			}, 0);
		},
		[index, parent_id, template_lock]
	);

	return (
		<Div className="block-header-container">
			<Div
				className="block-header"
				onClick={() => selectBlock(block.clientId)}
				draggable={can_move}
				onDragEnd={can_move ? resetMoving : null}
				onDragStart={can_move ? onDragStart : null}
			>
				{icon.src && (
					<Div className="block-icon">
						<WpIcon icon={icon.src} />
					</Div>
				)}
				<Span className="block-title">{title}</Span>
				<BlockHeaderContent block={block} />
				{has_children && (
					<Button
						className={["button-icon", "button-toggle_list"]}
						onClick={buttonOnClick}
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
