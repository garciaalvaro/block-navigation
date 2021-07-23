import { useSelect, useDispatch } from "@wordpress/data";
import { useContext, useEffect, useState } from "@wordpress/element";

import type { Util } from "./types";
import { context } from "../../context";
import { store_slug } from "@/store";

export const useMovingAttributes: Util = () => {
	const { id, parent_id } = useContext(context);

	const [moving_is_over, setMovingIsOver] = useState(false);
	const [is_moving, setIsMoving] = useState(false);

	const moving_block = useSelect(select => select(store_slug).moving_block());

	const name = useSelect(
		select => select("core/block-editor").getBlockName(id) || ""
	);

	const can_move = useSelect(
		select =>
			select("core/block-editor").getTemplateLock(parent_id) !== "all"
	);

	const { movingTypeUpdate, movingTypeReset, movingBlockUpdate } =
		useDispatch(store_slug);

	// @ts-expect-error @wordpress/block-editor types are outdated
	const { startDraggingBlocks, stopDraggingBlocks } =
		useDispatch("core/block-editor");

	useEffect(() => {
		if (!is_moving) return;

		startDraggingBlocks([id]);
		movingBlockUpdate({ id, name, parent_id });
		movingTypeUpdate("by_drag");
	}, [is_moving]);

	useEffect(() => {
		if (moving_block) return;

		// Reset moving_is_over
		setMovingIsOver(false);
	}, [moving_block]);

	// Delay the assignment of moving_block so we can apply
	// a different style (.content:before).
	const onDragStart = () => setIsMoving(true);
	const onDragEnd = () => {
		setIsMoving(false);

		stopDraggingBlocks();
		movingBlockUpdate(null);
		movingTypeReset();
	};
	const onDragEnter = () => setMovingIsOver(true);
	const onDragLeave = () => setMovingIsOver(false);

	return {
		moving_is_over,
		is_moving,
		can_move,
		draggable: can_move,
		onDragStart,
		onDragEnd,
		onDragEnter,
		onDragLeave,
	};
};
