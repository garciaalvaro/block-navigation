import type { FunctionComponent } from "react";

import type { BlockId, DropArea } from "@/types";

export type Context = {
	ancestor_ids: BlockId[];
	drop_areas: DropArea[];
	id: BlockId;
	parent_id: BlockId;
};

interface Props {
	id: BlockId;
}

export type Component = FunctionComponent<Props>;
