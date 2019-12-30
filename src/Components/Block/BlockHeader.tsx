import { useDispatch } from "@wordpress/data";
import { Icon as WpIcon } from "@wordpress/components";

import "./BlockHeader.styl";
import { Div, Span, Button, Icon } from "utils/Components";
import { store_slug } from "utils/data";
import { BlockHeaderContent } from "./BlockHeaderContent";
import { BlockMenuButton } from "./BlockMenuButton";

interface Props
	extends Pick<
		BlockProps,
		| "index"
		| "template_lock"
		| "id"
		| "parent_id"
		| "block_type"
		| "is_expanded"
	> {
	block: Block;
	can_move: boolean;
	has_children: boolean;
	toggleBlock: Function;
	collapseBlock: Function;
}

export const BlockHeader: React.ComponentType<Props> = props => {
	const {
		id,
		has_children,
		is_expanded,
		toggleBlock,
		collapseBlock,
		index,
		block,
		block_type,
		can_move,
		parent_id,
		template_lock
	} = props;

	const title = block_type ? block_type.title : block.name;
	const icon: BlockType["icon"] = block_type
		? block_type.icon
		: { src: () => null };

	const { setMovingType, setMovingBlock, resetMoving } = useDispatch(
		store_slug
	) as Pick<ActionCreators, "setMovingType" | "setMovingBlock" | "resetMoving">;
	const { selectBlock } = useDispatch("core/block-editor");

	const buttonOnClick = (e: any) => {
		e.stopPropagation();

		toggleBlock();
	};

	const onDragStart = (e: React.DragEvent) => {
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
				index,
				was_expanded: is_expanded
			});
		}, 0);
	};

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
						<Icon icon={is_expanded ? "collapse" : "expand"} />
					</Button>
				)}

				<BlockMenuButton
					id={id}
					parent_id={parent_id}
					template_lock={template_lock}
					block={block}
					block_type={block_type}
					can_move={can_move}
					index={index}
					collapseBlock={collapseBlock}
					is_expanded={is_expanded}
				/>
			</Div>
		</Div>
	);
};
