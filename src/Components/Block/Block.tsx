import { withSelect, withDispatch } from "@wordpress/data";
import { compose } from "@wordpress/compose";
import {
	Fragment,
	useState,
	useEffect,
	useRef,
	useContext
} from "@wordpress/element";

import "./Block.styl";
import { ContextContainer } from "../App/AppContainer";
import { DivRef } from "utils/Components";
import { store_slug } from "utils/data";
import { BlockHeader } from "./BlockHeader";
import { BlockList } from "../BlockList/BlockList";
import { BlockListDropArea } from "../BlockList/BlockListDropArea";
import { withMove, WithMoveProps } from "../HOC/withMove";

interface WithDispatchProps {
	collapseBlock: Function;
	expandBlock: Function;
}

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
			| "is_expanded"
		> {}

interface OwnProps
	extends Pick<
		BlockProps,
		"id" | "parent_id" | "level" | "index" | "is_last_children"
	> {}

interface Props
	extends OwnProps,
		WithMoveProps,
		WithSelectProps,
		WithDispatchProps {}

export const Block: React.ComponentType<OwnProps> = compose(
	withDispatch<WithDispatchProps, OwnProps>((dispatch, { id }) => ({
		expandBlock: () => dispatch(store_slug).expandBlock(id),
		collapseBlock: () => dispatch(store_slug).collapseBlock(id)
	})),

	withSelect<WithSelectProps, OwnProps>((select, { id, parent_id }) => {
		const {
			getBlock,
			getTemplateLock,
			canInsertBlockType,
			getSelectedBlockClientId,
			getSelectedBlockClientIds,
			getMultiSelectedBlockClientIds
		} = select("core/block-editor");

		const { getMovingBlock, isExpanded } = select(store_slug);

		const moving_block: State["moving_block"] = getMovingBlock();

		const block = getBlock(id);

		const block_type = block
			? select("core/blocks").getBlockType(block.name)
			: undefined;

		const moving_block_can_be_sibling = canInsertBlockType(
			moving_block.block_name,
			parent_id
		);

		const is_selected_in_multi = getSelectedBlockClientIds
			? getSelectedBlockClientIds().includes(id)
			: getMultiSelectedBlockClientIds().includes(id);

		const is_selected =
			is_selected_in_multi || getSelectedBlockClientId() === id;

		const reusable_block_entity =
			block &&
			block_type &&
			block_type.name === "core/block" &&
			// When creating a new reusable block Gutenberg returns
			// a string for the ref attribute, until it is saved
			typeof block.attributes.ref === "number"
				? select("core").getEntityRecord<any>(
						"postType",
						"wp_block",
						block.attributes.ref
				  )
				: undefined;

		return {
			is_expanded: isExpanded(id),
			block:
				reusable_block_entity && block
					? {
							...block,
							attributes: {
								...block.attributes,
								title: reusable_block_entity.title.raw
							}
					  }
					: block,
			block_type,
			is_selected,
			moving: select(store_slug).isMoving(),
			moving_type: select(store_slug).getMovingType(),
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
		is_expanded,
		expandBlock,
		collapseBlock,
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
	const [is_moving, setIsMoving] = useState(false);
	const toggleBlock = is_expanded ? collapseBlock : expandBlock;
	const ref = useRef<HTMLDivElement | null>(null);
	const container = useContext(ContextContainer);

	useEffect(() => {
		if (is_selected && ref.current && container) {
			const is_above = ref.current.offsetTop - container.scrollTop < 0;
			const is_below =
				ref.current.offsetTop - container.scrollTop + 50 >
				container.offsetHeight - 50;

			if (is_above || is_below) {
				container.scrollTop = ref.current.offsetTop - 26;
			}
		}
	}, [is_selected]);

	useEffect(() => {
		setIsMoving(moving_block.id === id);
	}, [moving_block]);

	if (!block) {
		return null;
	}

	return (
		<Fragment>
			<DivRef
				ref={ref}
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
					toggleBlock={toggleBlock}
					collapseBlock={collapseBlock}
					can_move={can_move}
					template_lock={template_lock}
					parent_id={parent_id}
					index={index}
					id={id}
					has_children={has_children}
					is_expanded={is_expanded}
				/>
			</DivRef>

			{has_children && is_expanded && (
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
