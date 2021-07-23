import type { BlockId, DropArea } from "@/types";

interface Props {
	id: BlockId;
	ancestors_id: BlockId[];
}

export type Util = (props: Props) => DropArea[];
