import type { FunctionComponent } from "react";

import {
	useCloseDetached,
	useResetMoving,
	useSetBlockIds,
	useUpdateIdsCollapsed,
	useUpdateIdsHidden,
	useUpdateIdsVisible,
} from "./utils";

export const SideEffects: FunctionComponent = () => {
	useCloseDetached();
	useResetMoving();
	useSetBlockIds();
	useUpdateIdsCollapsed();
	useUpdateIdsHidden();
	useUpdateIdsVisible();

	return null;
};
