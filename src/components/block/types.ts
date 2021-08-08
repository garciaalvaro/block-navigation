import type { FunctionComponent } from "react";

import type { ItemStyle } from "../blocks-list";

interface Props {
	style: Omit<ItemStyle, "id">;
}

export type Component = FunctionComponent<Props>;
