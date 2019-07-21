import { Div, DivRef } from "utils/components";
import { Block } from "./Block";

import { produce } from "immer";
import { pr_store } from "utils/data/plugin";
import { useRef, useEffect, useState } from "react";

type withSelectProps = {
	block_type: any;
};
type ParentProps = Object;
type Props = withSelectProps & ParentProps;

const { withSelect } = wp.data;

export const Item = withSelect<withSelectProps, ParentProps>(
	(select, { item }) => {
		const { getTemplateLock, canInsertBlockType } = select("core/block-editor");
		const { parent_id } = item.data;
		const moving = select(pr_store).getMoving();
		const is_moving = select(pr_store).isMoving();

		return {
			is_drop_above: select(pr_store).isDropAbove(item.id),
			is_moving,
			template_lock: getTemplateLock(parent_id),
			moving,
			moving_can_be_sibling: canInsertBlockType(moving.block_name, parent_id)
		};
	}
)((props => {
	const {
		tree,
		blocks_id,
		is_drop_above,
		template_lock,
		moving_can_be_sibling,
		is_moving,
		moving,
		item,
		provided,
		snapshot,
		depth,
		setTree
	} = props;
	const can_move = template_lock !== "all";
	const can_receive_drop =
		moving.template_lock === "insert"
			? moving.parent_id === item.data.parent_id
			: moving_can_be_sibling;
	// const transform_prev = useRef(null);
	// const [este, setEste] = useState(false);

	// l(can_receive_drop, item.data.block_name);
	if (snapshot.isDragging) {
		// l("is_drop_above", item.data.block_name);
		// if (!can_receive_drop) {
		l(props.snapshot);
		// provided.draggableProps.style.transform = null;
	}
	if (is_drop_above) {
		// l("is_drop_above", item.data.block_name);
		// 	// if (!can_receive_drop) {
		// 	// l(props.snapshot);
		// 	// provided.draggableProps.style.transform = null;
	}

	useEffect(() => {
		if (snapshot.isDragging) {
			return;
		}

		if (provided.draggableProps.style.transform === null) {
			// wp.data.dispatch(pr_store).setDropAbove(item.id);
			let index = blocks_id.indexOf(item.id);
			index =
				index !== -1 && blocks_id[index + 1] === moving.id ? index + 1 : index;

			if (index !== -1 && blocks_id[index + 1]) {
				l(
					"1leaving",
					item.data.block_name,
					"entering",
					tree.items[blocks_id[index + 1]].data.block_name
				);
				wp.data.dispatch(pr_store).setDropAbove(blocks_id[index + 1]);
			}
		} else {
			l("2leaving", item.data.block_name);
			wp.data.dispatch(pr_store).setDropAbove(item.id);
		}
	}, [provided.draggableProps.style.transform]);

	return (
		<DivRef
			id={item.id}
			onClick={() => {
				if (item.hasChildren) {
					setTree(tree =>
						produce(tree, draft => {
							const item_obj = draft.items[item.id];

							item_obj.isExpanded = !item_obj.isExpanded;
						})
					);
				}
			}}
			ref={provided.innerRef}
			{...provided.dragHandleProps}
			{...provided.draggableProps}
			style={{
				...provided.draggableProps.style
				// transform:
				// 	is_moving && !can_receive_drop
				// 		? null
				// 		: provided.draggableProps.style.transform
			}}
			classes={[
				"item",
				`depth-${depth}`,
				is_drop_above ? "is_drop_above" : "no-is_drop_above",
				can_move ? "can_move" : "no-can_move",
				can_receive_drop ? "can_receive_drop" : "no-can_receive_drop",
				snapshot.isDragging ? "is_moving" : "no-is_moving",
				snapshot.combineWith ? "is_over_item" : null,
				snapshot.combineTargetFor ? "has_item_over" : null
			]}
		>
			<Block id={item.id} />
		</DivRef>
	);
}) as React.ComponentType<Props>);
