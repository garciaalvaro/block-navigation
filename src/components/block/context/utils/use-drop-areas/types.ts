import type { BlockId, DropArea } from "@/types";

interface Props {
	id: BlockId;
	parent_id: BlockId;
	ancestor_ids: BlockId[];
}

export type Util = (props: Props) => DropArea[];
