import { useSelect, useDispatch } from "@wordpress/data";
import {
	useContext,
	useEffect,
	useState,
	useLayoutEffect,
} from "@wordpress/element";

import { store_slug } from "@/store";

import type { Util } from "./types";
import { context } from "../../context";

export const useMovingAttributes: Util = () => {
	const { id, parent_id } = useContext(context);

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

	// We need this callback to trigger the frame after the drag starts
	// so the correct classes are applied to the drag image.
	useEffect(() => {
		if (!is_moving) return;

		startDraggingBlocks([id]);
		movingBlockUpdate({ id, name, parent_id });
		movingTypeUpdate("by_drag");

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [is_moving]);

	useLayoutEffect(() => {
		if (moving_block || !is_moving) return;

		// Reset is_moving
		setIsMoving(false);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [moving_block]);

	useLayoutEffect(() => {
		if (moving_block || !moving_is_over) return;

		// Reset moving_is_over
		setMovingIsOver(false);

		// eslint-disable-next-line react-hooks/exhaustive-deps
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
