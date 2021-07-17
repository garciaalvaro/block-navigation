import type { FunctionComponent } from "react";

import type { BlockId } from "@/types";

export type Context = {
	ancestors_id: BlockId[];
	id: BlockId;
	parent_id: BlockId;
};

interface Props {
	id: BlockId;
}

export type Component = FunctionComponent<Props>;
