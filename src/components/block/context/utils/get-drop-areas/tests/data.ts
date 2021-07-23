import type { MockDataBlocksKey, MockDataBlocksValue } from "./types";

const data_blocks = new Map<MockDataBlocksKey, MockDataBlocksValue>();

data_blocks.set("a", {
	id: "a",
	ancestors_id: [],
	parent_id: "",
	index: 0,
	children: ["a1"],
});
data_blocks.set("a1", {
	id: "a1",
	ancestors_id: ["a"],
	parent_id: "a",
	index: 0,
	children: ["a11", "a12"],
});
data_blocks.set("a11", {
	id: "a11",
	ancestors_id: ["a", "a1"],
	parent_id: "a1",
	index: 0,
	children: [],
});
data_blocks.set("a12", {
	id: "a12",
	ancestors_id: ["a", "a1"],
	parent_id: "a1",
	index: 1,
	children: [],
});
data_blocks.set("b", {
	id: "b",
	ancestors_id: [],
	parent_id: "",
	index: 1,
	children: [],
});

export { data_blocks };

export const data_block_ids: MockDataBlocksKey[] = [...data_blocks.keys()];
