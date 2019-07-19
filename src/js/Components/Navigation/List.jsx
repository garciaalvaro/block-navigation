import l, { Div, pr_store } from "utils";
import Tree, { mutateTree, moveItemOnTree } from "@atlaskit/tree";

const list = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }];

const QList = props => {
	return (
		<DragDropContext onDragEnd={qqq => l("onDragEnd", qqq)}>
			<Droppable droppableId="droppable">
				{(provided, snapshot) => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						// style={getListStyle(snapshot.isDraggingOver)}
					>
						{list.map(({ id: i }) => (
							<Draggable key={i} draggableId={i} index={i}>
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										style={provided.draggableProps.style}
										// style={getItemStyle(
										// 	snapshot.isDragging,
										// 	provided.draggableProps.style
										// )}
									>
										{i}
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);

	return (
		<Div id="navigation">
			{/* <List height={150} itemCount={1000} itemSize={getItemSize} width={300}>
				{Row}
			</List> */}
			{list.map(i => (
				<Div
					key={i}
					id={`draggable-panel-${i}`}
					style={{
						padding: 15,
						borderBottom: "1px solid #aaa",
						textAlign: "center"
					}}
				>
					<Draggable elementId={`draggable-panel-${i}`} transferData={{}}>
						{({ onDraggableStart, onDraggableEnd }) => (
							<div
								draggable="true"
								onDragStart={onDraggableStart}
								onDragEnd={onDraggableEnd}
								style={{
									background: "red"
								}}
							>
								{i}
							</div>
						)}
					</Draggable>
				</Div>
			))}
		</Div>
	);
};

export default QList;
