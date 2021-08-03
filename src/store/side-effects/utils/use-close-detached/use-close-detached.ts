import { useSelect, useDispatch } from "@wordpress/data";
import { useLayoutEffect } from "@wordpress/element";

import { store_slug } from "@/store";
import { plugin_namespace } from "@/utils";

// When the plugin is opened on the sidebar, close the detached panel
export const useCloseDetached = (): void => {
	const sidebar_is_open = useSelect(
		select =>
			select("core/edit-post").getActiveGeneralSidebarName() ===
			`${plugin_namespace}/${plugin_namespace}`
	);

	const { detachedClose } = useDispatch(store_slug);

	useLayoutEffect(() => {
		if (!sidebar_is_open) return;

		detachedClose();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sidebar_is_open]);
};
