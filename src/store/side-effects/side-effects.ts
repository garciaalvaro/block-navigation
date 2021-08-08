import type { FunctionComponent } from "react";

import {
	useCloseDetached,
	useSetBlockIds,
	useUpdateIdsCollapsed,
	useUpdateIdsVisible,
} from "./utils";

export const SideEffects: FunctionComponent = () => {
	useCloseDetached();
	useSetBlockIds();
	useUpdateIdsCollapsed();
	useUpdateIdsVisible();

	return null;
};
