import { select } from "@wordpress/data";

export const generateTreeDefault = (): any => ({
	rootId: "root",
	items: { root: generateTreeItem("root") }
});

export const generateMovingDefault = () => ({
	id: "",
	parent_id: "",
	template_lock: "",
	block_name: ""
});

export const generateTreeItem = (
	id: string,
	children = [],
	data = {
		block_name: "",
		parent_id: "",
		template_lock: ""
	}
): any => {
	return {
		id,
		children,
		hasChildren: !!children.length,
		isExpanded: !!children.length,
		isChildrenLoading: false,
		data
	};
};

export const getItems = (blocks, parent_id = "", template_lock = "") =>
	blocks.reduce(
		(acc, block) => {
			const id = block.clientId;
			let children = {};

			acc.items_id.push(id);

			if (block.innerBlocks.length) {
				const { items_id: items_id_children, items: items_children } = getItems(
					block.innerBlocks,
					id,
					wp.data.select("core/block-editor").getTemplateLock(parent_id)
				);

				children = items_children;

				acc.items_id.push(...items_id_children);
			}

			return {
				items_id: acc.items_id,
				items: {
					...acc.items,
					...children,
					[id]: generateTreeItem(
						id,
						block.innerBlocks.map(({ clientId }) => clientId),
						{
							block_name: block.name,
							parent_id,
							template_lock
						}
					)
				}
			};
		},
		{ items_id: [], items: {} }
	);
