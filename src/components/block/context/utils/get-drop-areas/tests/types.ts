import type { BlockId } from "@/types";

export type MockDataBlocksKey = BlockId;

export type MockDataBlocksValue = {
	id: BlockId;
	ancestor_ids: BlockId[];
	parent_id: BlockId;
	index: number;
	children: BlockId[];
};
