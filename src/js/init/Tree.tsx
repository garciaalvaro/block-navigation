import { Div, DivRef } from "utils/components";
import {
	getItems,
	generateTreeDefault,
	generateTreeItem,
	generateMovingDefault
} from "utils/data/defaults";
import AtlasKitTree, {
	TreeSourcePosition,
	TreeDestinationPosition
} from "@atlaskit/tree";
import { Item } from "./Item";
import { pr_store } from "utils/data/plugin";

type Props = { blocks_id: any };

const { useEffect, useState } = wp.element;
const { withSelect, withDispatch, select, dispatch } = wp.data;
const { compose } = wp.compose;

export const Tree = compose([
	withSelect(select => {
		return {
			blocks_id: select("core/block-editor").getClientIdsWithDescendants(),
			moving: select(pr_store).getMoving()
		};
	}),
	withDispatch(dispatch => {
		const { setMoving } = dispatch(pr_store);

		return {
			setMoving
		};
	})
])((props => {
	const { blocks_id, moving, setMoving } = props;
	const [tree, setTree] = useState(generateTreeDefault());
	const [items_id, setItemsId] = useState([]);
	// const [moving, setMoving] = useState(generateMovingDefault());

	const moveTo = (
		source: TreeSourcePosition,
		destination: TreeDestinationPosition
	) => {
		if (!destination) {
			return;
		}

		dispatch("core/block-editor").moveBlockToPosition(
			moving.id,
			source.parentId === "root" ? "" : source.parentId,
			destination.parentId === "root" ? "" : destination.parentId,
			destination.index
		);

		setMoving(generateMovingDefault());
	};

	useEffect(() => {
		const blocks = select("core/block-editor").getBlocks();
		const root_blocks_id = select("core/block-editor").getBlockOrder();
		const { items, items_id } = getItems(blocks);

		const tree = {
			rootId: "root",
			items: {
				root: generateTreeItem("root", root_blocks_id),
				...items
				// ...keyBy(blocks.map(id => generateTreeItem(id)), "id")
			}
		};

		setTree(tree);
		setItemsId(items_id);
	}, [blocks_id]);

	if (!tree) {
		return null;
	}

	return (
		<Div
			id="container"
			classes={["!color_scheme-name-melocoton", "!color_scheme-type-light"]}
		>
			<AtlasKitTree
				tree={tree}
				renderItem={props => (
					<Item
						key={props.item.id}
						{...props}
						setTree={setTree}
						blocks_id={items_id}
						tree={tree}
					/>
				)}
				// @ts-ignore
				onDragEnd={moveTo}
				onDragStart={id => {
					const { parent_id, template_lock, block_name } = tree.items[id].data;
					l("----onDragStart");
					setMoving({
						id,
						parent_id,
						template_lock,
						block_name
					});
				}}
				isDragEnabled
				isNestingEnabled
				offsetPerLevel={20}
			/>
		</Div>
	);
}) as React.ComponentType<Props>);
