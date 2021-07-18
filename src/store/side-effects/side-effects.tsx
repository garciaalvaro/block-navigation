import React from "react";
import type { FunctionComponent } from "react";

import { updateIdsCollapsed, updateIdsHidden, updateIdsVisible } from "./utils";

export const SideEffects: FunctionComponent = () => {
	updateIdsCollapsed();
	updateIdsHidden();
	updateIdsVisible();

	return null;
};
