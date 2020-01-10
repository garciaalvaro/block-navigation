import { useDispatch, useSelect } from "@wordpress/data";
import { useRef } from "@wordpress/element";

import "./Block.styl";
import { Div, DivRef, Button, Icon } from "utils/Components";
import { store_slug } from "utils/data";
import { BlockHeader } from "../BlockHeader/BlockHeader";
import { BlockMenuButton } from "../BlockMenu/BlockMenuButton";
import { useScrollTo } from "./useScrollTo";
import { useIsSelected } from "./useIsSelected";
import { useAncestorsId } from "./useAncestorsId";
import { useDrop } from "./useDrop";
import { useMovingIsOver } from "./useMovingIsOver";

interface Props {
	id: BlockId;
	drop_areas: DropArea[];
}

export const Block: React.ComponentType<Props> = props => {
	const { id, drop_areas } = props;

	const block_div = useRef<HTMLDivElement | null>(null);

	const {
		resetMoving,
		expandBlock,
		collapseBlock,
		setMovingType,
		setMovingBlock
	} = useDispatch(store_slug);

	const is_expanded = useSelect<boolean>(select =>
		select(store_slug).isExpanded(id)
	);

	const children_length = useSelect(select =>
		select("core/block-editor").getBlockOrder(id)
	).length;

	const name = useSelect(select =>
		select("core/block-editor").getBlockName(id)
	);

	const moving_type = useSelect<State["moving_type"]>(select =>
		select(store_slug).getMovingType()
	);

	const moving_block = useSelect<State["moving_block"]>(select =>
		select(store_slug).getMovingBlock()
	);

	const { moving_is_over, setMovingIsOver } = useMovingIsOver();

	const is_selected = useIsSelected(id);

	const ancestors_id = useAncestorsId(id);

	const is_moving = moving_block && moving_block.id === id;

	const ancestor_is_moving =
		moving_block && ancestors_id.includes(moving_block.id);

	const level = ancestors_id.length;

	const parent_id = level > 0 ? ancestors_id[ancestors_id.length - 1] : "";

	const can_receive_drop = drop_areas.length;

	const index = useSelect(select =>
		select("core/block-editor").getBlockIndex(id, parent_id)
	);

	const can_move =
		useSelect(select =>
			select("core/block-editor").getTemplateLock(parent_id)
		) !== "all";

	const onDrop = useDrop({
		parent_id,
		block_div: block_div.current,
		drop_areas
	});

	useScrollTo({ id, block_div: block_div.current });

	const toggleBlock = () => (is_expanded ? collapseBlock(id) : expandBlock(id));

	return (
		<DivRef
			ref={block_div}
			className={[
				"block",
				`level-${level}`,
				ancestor_is_moving ? "ancestor_is_moving" : null,
				can_receive_drop ? "can_receive_drop" : null,
				is_selected ? "is_selected" : null,
				`${is_moving ? "" : "no-"}is_moving`,
				`${moving_is_over ? "" : "no-"}moving_is_over`,
				`${can_move ? "" : "no-"}can_move`
			]}
			onDragEnter={() => setMovingIsOver(true)}
			onDragLeave={() => setMovingIsOver(false)}
			onDrop={onDrop}
			onClick={(e: React.DragEvent) => {
				if (moving_type !== "by_click") return;

				onDrop(e);
				resetMoving();
			}}
		>
			<Div className="block-container">
				<BlockHeader
					id={id}
					onDragEnd={resetMoving}
					onDragStart={(e: React.DragEvent) => {
						if (e.dataTransfer && e.dataTransfer.setData) {
							// Needed for Firefox to work.
							// https://stackoverflow.com/a/33465176 | CC BY-SA 3.0
							e.dataTransfer.setData("text", "");
						}

						setMovingBlock({ id, parent_id, index, level, name });

						setTimeout(() => setMovingType("by_drag"), 0);
					}}
				/>

				{children_length > 0 && (
					<Button
						className={["button-icon", "button-toggle_list"]}
						onClick={toggleBlock}
					>
						<Icon icon={is_expanded ? "collapse" : "expand"} />
					</Button>
				)}

				<BlockMenuButton
					id={id}
					setMovingBlock={() =>
						setMovingBlock({ id, parent_id, index, level, name })
					}
				/>
			</Div>
		</DivRef>
	);
};
