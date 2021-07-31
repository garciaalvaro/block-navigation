import React from "react";
import type { FunctionComponent } from "react";
import { useContext } from "@wordpress/element";
import { useDispatch, useSelect, select } from "@wordpress/data";
import { __ } from "@wordpress/i18n";

import type { DropArea } from "@/types";
import { className, getParentId } from "@/utils";
import { store_slug } from "@/store";

import styles from "./styles.styl";
import { context } from "../block";

export const BlockDropAreas: FunctionComponent = () => {
	const { drop_areas, ancestor_ids } = useContext(context);

	const block_level = ancestor_ids.length;

	const moving_block = useSelect(_select =>
		_select(store_slug).moving_block()
	);
	const moving_type = useSelect(_select => _select(store_slug).moving_type());

	const { movingTypeReset, movingBlockUpdate } = useDispatch(store_slug);

	// @ts-expect-error @wordpress/block-editor types are outdated
	const { moveBlockToPosition, stopDraggingBlocks } =
		useDispatch("core/block-editor");

	const moveTo = (drop_area: DropArea, event_type: "drop" | "click") => {
		if (
			!moving_block ||
			(event_type === "drop" && moving_type !== "by_drag") ||
			(event_type === "click" && moving_type !== "by_click")
		) {
			return;
		}

		const moving_block_parent_id = getParentId(moving_block.id);

		if (moving_block_parent_id === null) return;

		moveBlockToPosition(
			moving_block.id,
			moving_block_parent_id,
			drop_area.id,
			moving_block_parent_id === drop_area.id &&
				drop_area.index >=
					select("core/block-editor").getBlockIndex(
						moving_block.id,
						moving_block_parent_id
					)
				? drop_area.index - 1
				: drop_area.index
		);

		// Although these events get called on onDragEnd,
		// calling theme here will trigger the update sooner.
		// Calling them on onDragEnd is still needed, in case
		// there is no drop inside a drop area.
		stopDraggingBlocks();
		movingBlockUpdate(null);
		movingTypeReset();
	};

	if (!drop_areas.length) {
		return null;
	}

	return (
		<div className={styles.container}>
			{drop_areas.map(drop_area => (
				<div
					role="button"
					tabIndex={0}
					aria-label={__("Drop block here")}
					key={drop_area.id}
					onDrop={() => moveTo(drop_area, "drop")}
					onClick={() => moveTo(drop_area, "click")}
					onKeyDown={e => {
						if (e.key !== "Enter") return;

						moveTo(drop_area, "click");
					}}
					// Necessary for onDrop to fire
					onDragOver={e => e.preventDefault()}
					className={className(
						styles.drop_area,
						styles[`level-${drop_area.level + block_level}`],
						styles[`block_level-${block_level}`]
					)}
				/>
			))}
		</div>
	);
};
