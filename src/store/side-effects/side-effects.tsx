import React from "react";
import type { FunctionComponent } from "react";

import { updateIdsCollapsed, updateIdsHidden } from "./utils";

export const SideEffects: FunctionComponent = () => {
	updateIdsCollapsed();
	updateIdsHidden();

	return null;
};
