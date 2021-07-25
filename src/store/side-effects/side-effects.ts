import type { FunctionComponent } from "react";

import {
	closeDetached,
	resetMoving,
	setBlockIds,
	updateIdsCollapsed,
	updateIdsHidden,
	updateIdsVisible,
} from "./utils";

export const SideEffects: FunctionComponent = () => {
	closeDetached();
	resetMoving();
	setBlockIds();
	updateIdsCollapsed();
	updateIdsHidden();
	updateIdsVisible();

	return null;
};
