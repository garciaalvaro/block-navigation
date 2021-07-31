import { useSelect, useDispatch } from "@wordpress/data";
import { useContext, useEffect, useState, useRef } from "@wordpress/element";

import { store_slug } from "@/store";

import type { Util } from "./types";
import { context } from "../../context";

export const useMovingAttributes: Util = () => {
	const { id, parent_id } = useContext(context);

	// eslint-disable-next-line no-undef
	const prevent_drag_leave_timeout = useRef<NodeJS.Timeout | null>(null);

	const [moving_is_over, setMovingIsOver] = useState(false);
	const [is_moving, setIsMoving] = useState(false);

	const moving_block = useSelect(select => select(store_slug).moving_block());

	const name = useSelect(
		select => select("core/block-editor").getBlockName(id) || ""
	);

	const can_move =
		useSelect(
			select =>
				select("core/block-editor").getTemplateLock(parent_id) !== "all"
		) && !moving_block;

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

		// eslint-disable-next-line react-hooks/exhaustive-deps
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

	// Dragging between drop areas of the same block triggers
	// onDragEnter and immediately onDragLeave.
	const onDragEnter = () => {
		prevent_drag_leave_timeout.current = setTimeout(() => {
			prevent_drag_leave_timeout.current = null;
		}, 100);

		setMovingIsOver(true);
	};
	const onDragLeave = () => {
		if (prevent_drag_leave_timeout.current) return;

		setMovingIsOver(false);
	};

	useEffect(() => {
		if (prevent_drag_leave_timeout.current) {
			clearTimeout(prevent_drag_leave_timeout.current);
		}
	}, []);

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
