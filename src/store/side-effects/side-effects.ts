import type { FunctionComponent } from "react";

import {
	useCloseDetached,
	useResetMoving,
	useSetBlockIds,
	useUpdateIdsCollapsed,
	useUpdateIdsVisible,
} from "./utils";

export const SideEffects: FunctionComponent = () => {
	useCloseDetached();
	useResetMoving();
	useSetBlockIds();
	useUpdateIdsCollapsed();
	useUpdateIdsVisible();

	return null;
};
