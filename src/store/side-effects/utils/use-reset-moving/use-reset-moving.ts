import { useSelect, useDispatch } from "@wordpress/data";
import { useLayoutEffect } from "@wordpress/element";

import { store_slug } from "@/store";

export const useResetMoving = (): void => {
	// @ts-expect-error @wordpress/block-editor types are outdated
	const { stopDraggingBlocks } = useDispatch("core/block-editor");

	const { movingBlockUpdate, movingTypeReset } = useDispatch(store_slug);

	const is_detached = useSelect(select => select(store_slug).is_detached());
	const moving_block = useSelect(select => select(store_slug).moving_block());

	useLayoutEffect(() => {
		if (!moving_block) return;

		stopDraggingBlocks();
		movingBlockUpdate(null);
		movingTypeReset();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [is_detached]);
};
