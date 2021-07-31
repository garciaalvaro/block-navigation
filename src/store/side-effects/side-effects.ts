import type { FunctionComponent } from "react";

import {
	useCloseDetached,
	useSetBlockIds,
	useUpdateIdsCollapsed,
	useUpdateIdsRootCollapsible,
	useUpdateIdsVisible,
} from "./utils";

export const SideEffects: FunctionComponent = () => {
	useCloseDetached();
	useSetBlockIds();
	useUpdateIdsCollapsed();
	useUpdateIdsRootCollapsible();
	useUpdateIdsVisible();

	return null;
};
