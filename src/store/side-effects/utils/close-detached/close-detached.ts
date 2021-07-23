import { useSelect, useDispatch } from "@wordpress/data";
import { useLayoutEffect } from "@wordpress/element";

import { store_slug } from "@/store";

// When the plugin is opened on the sidebar, close the detached panel
export const closeDetached = (): void => {
	const sidebar_is_open = useSelect(
		select =>
			select("core/edit-post").getActiveGeneralSidebarName() ===
			"block-navigation/block-navigation"
	);

	const { detachedClose } = useDispatch(store_slug);

	useLayoutEffect(() => {
		if (!sidebar_is_open) return;

		detachedClose();
	}, [sidebar_is_open]);
};
