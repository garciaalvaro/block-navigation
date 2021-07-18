import React from "react";
import type { FunctionComponent } from "react";

import {
	updateIdsCollapsed,
	updateIdsHidden,
	updateIdsVisible,
	updateDropAreas,
} from "./utils";

export const SideEffects: FunctionComponent = () => {
	updateIdsCollapsed();
	updateIdsHidden();
	updateIdsVisible();
	updateDropAreas();

	return null;
};
