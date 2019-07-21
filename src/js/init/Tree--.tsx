// import { Div, DivRef } from "utils/components";
// import { Item } from "./Item";
// import { DragDropContext, Droppable } from "react-beautiful-dnd";

// type Props = { blocks_id: any };

// const { useEffect, useState } = wp.element;
// const { withSelect, select } = wp.data;

// const getItems = blocks =>
// 	blocks.reduce((acc, block) => {
// 		const id = block.clientId;
// 		let children = [];

// 		if (block.innerBlocks.length) {
// 			children = getItems(block.innerBlocks);
// 		}

// 		return [
// 			...acc,
// 			{
// 				id,
// 				children: block.innerBlocks.map(({ clientId }) => clientId),
// 				is_open: true
// 			},
// 			...children
// 		];
// 	}, []);

// export const Tree = withSelect(select => {
// 	const { getClientIdsWithDescendants } = select("core/block-editor");

// 	return {
// 		blocks_id: getClientIdsWithDescendants()
// 	};
// })((props => {
// 	const { blocks_id } = props;
// 	const [tree, setTree] = useState([]);
// 	const [moving_id, setMovingId] = useState("");

// 	useEffect(() => {
// 		const blocks = select("core/block-editor").getBlocks();
// 		const root_blocks_id = select("core/block-editor").getBlockOrder();

// 		const tree = getItems(blocks);

// 		setTree(tree);
// 	}, [blocks_id]);

// 	if (!tree.length) {
// 		return null;
// 	}

// 	return (
// 		<Div id="container">
// 			<DragDropContext
// 				onDragEnd={(result, provided) => {
// 					l("onDragEnd", result, provided);
// 					setMovingId("");
// 				}}
// 				onDragUpdate={(initial, provided) => {
// 					// l("onDragUpdate", initial, provided);
// 				}}
// 				onDragStart={(initial, provided) => {
// 					setMovingId(initial.draggableId);

// 					const item_moving = tree.find(({ id }) => id === initial.draggableId);

// 					setTree(tree => {
// 						return tree.filter(({ id }) => !item_moving.children.includes(id));
// 					});

// 					l("onDragStart", initial, provided);
// 				}}
// 				// onBeforeDragStart
// 			>
// 				{tree.map((item, index) => (
// 					<Item {...item} index={index} moving_id={moving_id} />
// 				))}
// 			</DragDropContext>
// 		</Div>
// 	);
// }) as React.ComponentType<Props>);
