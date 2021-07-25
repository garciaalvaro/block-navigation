import type { FunctionComponent } from "react";

import {
	closeDetached,
	resetMoving,
	updateIdsCollapsed,
	updateIdsHidden,
	updateIdsVisible,
} from "./utils";

export const SideEffects: FunctionComponent = () => {
	closeDetached();
	resetMoving();
	updateIdsCollapsed();
	updateIdsHidden();
	updateIdsVisible();

	return null;
};
