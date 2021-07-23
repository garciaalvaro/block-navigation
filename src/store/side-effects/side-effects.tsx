import React from "react";
import type { FunctionComponent } from "react";

import {
	closeDetached,
	updateIdsCollapsed,
	updateIdsHidden,
	updateIdsVisible,
} from "./utils";

export const SideEffects: FunctionComponent = () => {
	closeDetached();
	updateIdsCollapsed();
	updateIdsHidden();
	updateIdsVisible();

	return null;
};
