import { getDropAreas } from "../get-drop-areas";
import { mockUtils, mockSelect } from "@/utils-test";

import type { BlockId } from "@/types";
import { data_block_ids, data_blocks } from "./data";

jest.mock("@/utils");
jest.mock("@wordpress/data");

mockUtils("getAncestorsId", (id: BlockId) => data_blocks.get(id)?.ancestors_id);
mockUtils("getParentId", (id: BlockId) => data_blocks.get(id)?.parent_id);
mockSelect({
	canInsertBlockType: () => true,
	getBlockIndex: id => data_blocks.get(id as BlockId)?.index,
	getBlockOrder: id => data_blocks.get(id as BlockId)?.children,
});

test("getDropAreas", () => {
	const block = data_blocks.get("a12");

	if (!block) return;

	expect(
		getDropAreas({
			id: block.id,
			parent_id: block.parent_id,
			ancestors_id: block.ancestors_id,
			moving_block: { id: "z", parent_id: "", name: "" },
			ids_visible: data_block_ids,
		})
	).toStrictEqual([
		{
			id: "a1",
			index: 1,
			level: 0,
		},
		{
			id: "a11",
			index: 0,
			level: 1,
		},
	]);
});

test("getDropAreas first block in nested list", () => {
	const block = data_blocks.get("a11");

	if (!block) return;

	expect(
		getDropAreas({
			id: block.id,
			parent_id: block.parent_id,
			ancestors_id: block.ancestors_id,
			moving_block: { id: "z", parent_id: "", name: "" },
			ids_visible: data_block_ids,
		})
	).toStrictEqual([
		{
			id: "a1",
			index: 0,
			level: 0,
		},
	]);
});

test("getDropAreas first block in list", () => {
	const block = data_blocks.get("a");

	if (!block) return;

	expect(
		getDropAreas({
			id: block.id,
			parent_id: block.parent_id,
			ancestors_id: block.ancestors_id,
			moving_block: { id: "z", parent_id: "", name: "" },
			ids_visible: data_block_ids,
		})
	).toStrictEqual([
		{
			id: "",
			index: 0,
			level: 0,
		},
	]);
});

test("getDropAreas last block in list", () => {
	const block = data_blocks.get("b");

	if (!block) return;

	expect(
		getDropAreas({
			id: block.id,
			parent_id: block.parent_id,
			ancestors_id: block.ancestors_id,
			moving_block: { id: "z", parent_id: "", name: "" },
			ids_visible: data_block_ids,
		})
	).toStrictEqual([
		{
			id: "",
			index: 1,
			level: 0,
		},
		{
			id: "a",
			index: 1,
			level: 1,
		},
		{
			id: "a1",
			index: 2,
			level: 2,
		},
		{
			id: "a12",
			index: 0,
			level: 3,
		},
	]);
});
