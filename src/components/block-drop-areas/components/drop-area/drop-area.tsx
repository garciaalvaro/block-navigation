import React from "react";
import { useContext, useRef, useEffect, useCallback } from "@wordpress/element";
import { useDispatch, useSelect, select } from "@wordpress/data";
import { __ } from "@wordpress/i18n";

import { className, getParentId } from "@/utils";
import { store_slug } from "@/store";
import { context } from "@/components/block";

import styles from "./styles.styl";
import type { Component } from "./types";

export const DropArea: Component = props => {
	const {
		id: drop_area_id,
		index: drop_area_index,
		level: drop_area_level,
	} = props;

	const { ancestor_ids } = useContext(context);

	const $element = useRef<null | HTMLDivElement>(null);

	const block_level = ancestor_ids.length;

	const moving_block = useSelect(_select =>
		_select(store_slug).moving_block()
	);
	const moving_type = useSelect(_select => _select(store_slug).moving_type());

	const { movingTypeReset, movingBlockUpdate } = useDispatch(store_slug);

	// @ts-expect-error @wordpress/block-editor types are outdated
	const { moveBlockToPosition, stopDraggingBlocks } =
		useDispatch("core/block-editor");

	const moveTo = useCallback(
		(event_type: "drop" | "click" = "drop") => {
			if (
				!moving_block ||
				(event_type === "drop" && moving_type !== "by_drag") ||
				(event_type === "click" && moving_type !== "by_click")
			) {
				return;
			}

			// Reset moving necessary in by_click and also in by_drag,
			// in the case that there is no drop.
			stopDraggingBlocks();
			movingBlockUpdate(null);
			movingTypeReset();

			const moving_block_parent_id = getParentId(moving_block.id);

			if (moving_block_parent_id === null) return;

			moveBlockToPosition(
				moving_block.id,
				moving_block_parent_id,
				drop_area_id,
				moving_block_parent_id === drop_area_id &&
					drop_area_index >=
						select("core/block-editor").getBlockIndex(
							moving_block.id,
							moving_block_parent_id
						)
					? drop_area_index - 1
					: drop_area_index
			);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[
			moving_block,
			moving_type,
			drop_area_id,
			drop_area_index,
			drop_area_level,
		]
	);

	useEffect(() => {
		const $drop_area = $element.current;

		if (!$drop_area) return;

		const onDrop = () => moveTo();

		// WP 5.7 does not seem to trigger onDrop events assigned with React
		$drop_area.addEventListener("drop", onDrop);

		// eslint-disable-next-line consistent-return
		return () => $drop_area.removeEventListener("drop", onDrop);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [moveTo]);

	return (
		<div
			ref={$element}
			role="button"
			tabIndex={0}
			aria-label={__("Drop block here")}
			onClick={() => moveTo("click")}
			onKeyDown={e => {
				if (e.key !== "Enter") return;

				moveTo("click");
			}}
			// Necessary for onDrop to fire
			onDragOver={e => e.preventDefault()}
			className={className(
				styles.container,
				styles[`level-${drop_area_level + block_level}`],
				styles[`block_level-${block_level}`]
			)}
		/>
	);
};
