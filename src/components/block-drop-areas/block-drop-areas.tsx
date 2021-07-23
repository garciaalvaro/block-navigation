import React from "react";
import type { FunctionComponent } from "react";
import { useContext } from "@wordpress/element";
import { useDispatch, useSelect } from "@wordpress/data";

import styles from "./styles.styl";
import { className, getParentId } from "@/utils";
import { store_slug } from "@/store";
import { context } from "../block";

export const BlockDropAreas: FunctionComponent = () => {
	const { drop_areas } = useContext(context);

	const moving_block = useSelect(select => select(store_slug).moving_block());

	const { movingTypeReset, movingBlockUpdate } = useDispatch(store_slug);

	// @ts-expect-error @wordpress/block-editor types are outdated
	const { moveBlockToPosition, stopDraggingBlocks } =
		useDispatch("core/block-editor");

	if (!drop_areas.length) {
		return null;
	}

	return (
		<div className={styles.container}>
			{drop_areas.map(({ id, level, index }) => (
				<div
					key={id}
					onDrop={() => {
						if (!moving_block) return;

						const moving_block_parent_id = getParentId(
							moving_block.id
						);

						if (moving_block_parent_id === null) return;

						moveBlockToPosition(
							moving_block.id,
							moving_block_parent_id,
							id,
							index
						);

						// Although these events get called on onDragEnd,
						// calling theme here will trigger the update sooner.
						// Calling them on onDragEnd is still needed, in case
						// there is no drop inside a drop area.
						stopDraggingBlocks();
						movingBlockUpdate(null);
						movingTypeReset();
					}}
					// Necessary for onDrop to fire
					onDragOver={e => e.preventDefault()}
					className={className(
						styles["drop_area"],
						styles[`level-${level}`]
					)}
				/>
			))}
		</div>
	);
};
