import React from "react";
import type { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";
import { useDispatch, useSelect } from "@wordpress/data";

import { ContextProvider } from "@/components/block";
import { BlockContent } from "@/components/block-content";
import { store_slug } from "@/store";
import { useClassName, Button } from "@/utils";

import styles from "./styles.styl";

export const Toolbar: FunctionComponent = () => {
	const { movingTypeReset, movingBlockUpdate } = useDispatch(store_slug);

	// @ts-expect-error @wordpress/block-editor types are outdated
	const { stopDraggingBlocks } = useDispatch("core/block-editor");

	const is_detached = useSelect(select => select(store_slug).is_detached());

	const moving_block = useSelect(select => select(store_slug).moving_block());

	const className_container = useClassName([is_detached], {
		[styles.container]: true,
		[styles.is_detached]: is_detached,
	});

	if (!moving_block) {
		return null;
	}

	return (
		<div className={className_container}>
			<div className={styles.block_title}>
				<ContextProvider id={moving_block.id}>
					<BlockContent />
				</ContextProvider>
			</div>

			<Button
				className={styles.button}
				onClick={() => {
					stopDraggingBlocks();
					movingBlockUpdate(null);
					movingTypeReset();
				}}
			>
				{__("Cancel Move")}
			</Button>
		</div>
	);
};
