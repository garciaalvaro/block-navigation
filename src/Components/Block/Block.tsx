import { Div } from "utils/Components";
import { pr_store } from "utils/data";
import { useToggle } from "utils/hooks";
import { BlockHeader } from "./BlockHeader";
import { BlockList } from "../BlockList/BlockList";
import { BlockListDropArea } from "../BlockList/BlockListDropArea";
import { withMove, WithMoveProps } from "../HOC/withMove";

interface WithSelectProps
	extends Pick<State, "moving_block" | "moving_type">,
		Pick<
			BlockProps,
			| "template_lock"
			| "moving"
			| "block"
			| "block_type"
			| "is_selected"
			| "can_receive_drop"
		> {}

interface OwnProps
	extends Pick<
		BlockProps,
		"id" | "parent_id" | "level" | "index" | "is_last_children"
	> {}

interface Props extends OwnProps, WithMoveProps, WithSelectProps {}

const { withSelect } = wp.data;
const { compose } = wp.compose;
const { Fragment, useState, useEffect } = wp.element;

export const Block: React.ComponentType<OwnProps> = compose(
	withSelect<WithSelectProps, OwnProps>((select, { id, parent_id }) => {
		const {
			getBlock,
			getTemplateLock,
			canInsertBlockType,
			getSelectedBlockClientId,
			getSelectedBlockClientIds,
			getMultiSelectedBlockClientIds
		} = select("core/block-editor");
		const moving_block: State["moving_block"] = select(
			pr_store
		).getMovingBlock();
		const block = getBlock(id);
		const moving_block_can_be_sibling = canInsertBlockType(
			moving_block.block_name,
			parent_id
		);
		const is_selected_in_multi = getSelectedBlockClientIds
			? getSelectedBlockClientIds().includes(id)
			: getMultiSelectedBlockClientIds().includes(id);
		const is_selected =
			is_selected_in_multi || getSelectedBlockClientId() === id;

		return {
			block,
			block_type: block
				? select("core/blocks").getBlockType(block.name)
				: undefined,
			is_selected,
			moving: select(pr_store).isMoving(),
			moving_type: select(pr_store).getMovingType(),
			template_lock: getTemplateLock(parent_id) || "",
			moving_block,
			can_receive_drop:
				moving_block.template_lock === "insert"
					? moving_block.parent_id === parent_id
					: moving_block_can_be_sibling
		};
	}),
	withMove
)((props: Props) => {
	const {
		toggleMovingIsOver,
		moveBlock,
		is_selected,
		can_receive_drop,
		moving_type,
		moving,
		moving_is_over,
		index,
		moving_block,
		parent_id,
		id,
		block,
		block_type,
		level,
		template_lock,
		is_last_children
	} = props;
	const has_children = block ? !!block.innerBlocks.length : false;
	const can_move = template_lock !== "all";
	const { is_open, toggle, close, open } = useToggle(true);
	const [is_moving, setIsMoving] = useState(false);
	const [was_open, setWasOpen] = useState(false);

	useEffect(() => {
		setIsMoving(moving_block.id === id);
	}, [moving_block]);

	useEffect(() => {
		setWasOpen(is_open);
	}, [is_moving]);

	useEffect(() => {
		if (is_moving) {
			close();
		} else if (was_open) {
			open();
		}
	}, [is_moving]);

	if (!block) {
		return null;
	}

	return (
		<Fragment>
			<Div
				id={id}
				onDragEnter={toggleMovingIsOver}
				onDragLeave={toggleMovingIsOver}
				onDrop={moveBlock}
				onClick={!moving || moving_type !== "by_click" ? null : moveBlock}
				className={[
					"block",
					`level-${level}`,
					`${is_moving ? "" : "no-"}is_moving`,
					`${can_receive_drop ? "" : "no-"}can_receive_drop`,
					`${moving_is_over ? "" : "no-"}moving_is_over`,
					`${can_move ? "" : "no-"}can_move`,
					`${is_selected ? "" : "no-"}is_selected`
				]}
			>
				<BlockHeader
					block={block}
					block_type={block_type}
					toggle={toggle}
					close={close}
					can_move={can_move}
					template_lock={template_lock}
					parent_id={parent_id}
					index={index}
					id={id}
					has_children={has_children}
					is_open={is_open}
				/>
			</Div>
			{has_children && is_open && (
				<BlockList
					ids={block.innerBlocks.map(({ clientId }) => clientId)}
					level={level + 1}
					parent_id={id}
				/>
			)}
			{is_last_children && moving && can_receive_drop && (
				<BlockListDropArea
					parent_id={parent_id}
					index={index + 1}
					level={level}
					can_receive_drop={true}
				/>
			)}
		</Fragment>
	);
});
