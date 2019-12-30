import { useSelect, useDispatch } from "@wordpress/data";
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
import { useMove } from "../../hooks/useMove";

interface Props
	extends Pick<
		BlockProps,
		"id" | "parent_id" | "level" | "index" | "is_last_children"
	> {}

export const Block: React.ComponentType<Props> = props => {
	const { index, parent_id, id, level, is_last_children } = props;

	const { expandBlock, collapseBlock } = useDispatch(store_slug);

	const moving_block = useSelect<State["moving_block"]>(select =>
		select(store_slug).getMovingBlock()
	);

	let block = useSelect(select => select("core/block-editor").getBlock(id));

	const block_type = useSelect(select =>
		select("core/blocks").getBlockType(block?.name)
	);

	const moving_block_can_be_sibling = useSelect(select =>
		select("core/block-editor").canInsertBlockType(
			moving_block.block_name,
			parent_id
		)
	);

	const is_selected_multiple = useSelect(select =>
		select("core/block-editor")
			.getSelectedBlockClientIds()
			.includes(id)
	);

	const is_selected_single = useSelect(
		select => select("core/block-editor").getSelectedBlockClientId() === id
	);

	const is_selected = is_selected_multiple || is_selected_single;

	const reusable_block_entity =
		block_type?.name === "core/block" &&
		// When creating a new reusable block Gutenberg returns
		// a string for the ref attribute, until it is saved
		typeof block?.attributes.ref === "number"
			? useSelect(select =>
					select("core").getEntityRecord<any>(
						"postType",
						"wp_block",
						block?.attributes.ref
					)
			  )
			: undefined;

	const is_expanded = useSelect<boolean>(select =>
		select(store_slug).isExpanded(id)
	);

	if (reusable_block_entity && block) {
		block = {
			...block,
			attributes: {
				...block.attributes,
				title: reusable_block_entity.title.raw
			}
		};
	}

	const moving = useSelect<boolean>(select => select(store_slug).isMoving());

	const moving_type = useSelect<State["moving_type"]>(select =>
		select(store_slug).getMovingType()
	);

	const template_lock = useSelect(
		select => select("core/block-editor").getTemplateLock(parent_id) || ""
	);

	const can_receive_drop =
		moving_block.template_lock === "insert"
			? moving_block.parent_id === parent_id
			: moving_block_can_be_sibling;

	const { moving_is_over, toggleMovingIsOver, moveBlock } = useMove({
		can_receive_drop,
		parent_id,
		index
	});

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
};
