import type { FunctionComponent } from "react";

import type { ItemStyle } from "../blocks-list";

interface Props {
	style: Exclude<ItemStyle, undefined>;
}

export type Component = FunctionComponent<Props>;
