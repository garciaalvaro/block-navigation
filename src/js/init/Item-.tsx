// import { Div, DivRef } from "utils/components";

// import { Draggable, Droppable } from "react-beautiful-dnd";

// type withSelectProps = {
// 	block: any;
// };
// type ParentProps = Object;
// type Props = withSelectProps & ParentProps;

// const { useEffect, useState } = wp.element;
// const { withSelect } = wp.data;

// export const Item = withSelect<withSelectProps, ParentProps>(
// 	(select, { item }) => {
// 		const { getBlock } = select("core/block-editor");

// 		return {
// 			block: getBlock(item.id)
// 		};
// 	}
// )((props => {
// 	const { block, moving_id, item, provided, snapshot, depth } = props;

// 	return (
// 		<DivRef
// 			id={item.id}
// 			ref={provided.innerRef}
// 			{...provided.draggableProps}
// 			{...provided.dragHandleProps}
// 			classes={[
// 				"item",
// 				`depth-${depth}`,
// 				snapshot.isDragging ? "is_moving" : null,
// 				snapshot.combineWith ? "is_over_item" : null,
// 				snapshot.combineTargetFor ? "has_item_over" : null
// 			]}
// 		>
// 			{block.name}
// 		</DivRef>
// 	);

// 	return (
// 		<Droppable droppableId={id} type={block.name}>
// 			{provided => (
// 				<DivRef
// 					ref={provided.innerRef}
// 					{...provided.droppableProps}
// 					classes={["item", moving_id === id ? "is_moving" : ""]}
// 				>
// 					<Draggable draggableId={id} index={0} type={block.name}>
// 						{provided => {
// 							// l(block.name + "-" + id, provided);
// 							return (
// 								<DivRef
// 									ref={provided.innerRef}
// 									// innerRef={provided.innerRef}
// 									{...provided.draggableProps}
// 									{...provided.dragHandleProps}
// 									// classes={["item", moving_id === id ? "moving_id" : ""]}
// 								>
// 									{block.name}
// 								</DivRef>
// 							);
// 						}}
// 					</Draggable>
// 					{provided.placeholder}
// 				</DivRef>
// 			)}
// 		</Droppable>
// 	);
// }) as React.ComponentType<Props>);
