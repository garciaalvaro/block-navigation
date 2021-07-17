import { useEffect } from "@wordpress/element";
import { useSelect, useDispatch } from "@wordpress/data";

import type { SetBlockIds } from "./types";
import { getDescendantIds } from "./utils";
import { store_slug } from "@/store";
import { plugin_namespace } from "@/utils";

export const setBlockIds: SetBlockIds = () => {
	const { idsVisibleUpdate } = useDispatch(store_slug);

	const ids = useSelect(select =>
		select("core/block-editor").getClientIdsWithDescendants()
	);

	const is_detached = useSelect(select => select(store_slug).is_detached());
	const detached_is_expanded = useSelect(select =>
		select(store_slug).detached_is_expanded()
	);
	const sidebar_is_open = useSelect(
		select =>
			select("core/edit-post").getActiveGeneralSidebarName() ===
			`${plugin_namespace}/${plugin_namespace}`
	);

	useEffect(() => {
		// If the plugin is detached but not expanded, skip
		if (is_detached && !detached_is_expanded) return;

		// If the plugin is in the sidebar but not open, skip
		if (!is_detached && !sidebar_is_open) return;

		idsVisibleUpdate(getDescendantIds());
	}, [ids, detached_is_expanded, is_detached, sidebar_is_open]);
};
