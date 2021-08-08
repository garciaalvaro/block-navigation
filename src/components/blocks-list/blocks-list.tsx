import React from "react";
import type { FunctionComponent } from "react";
import { useLayoutEffect, useState } from "@wordpress/element";
import { useSelect, select } from "@wordpress/data";

import { store_slug } from "@/store";
import type { BlockId } from "@/types";

import { useScrollToSelectedBlock, useVirtualList } from "./utils";
import { ContextProvider, Block } from "../block";

export const BlocksList: FunctionComponent = () => {
	const ids_visible = useSelect(_select => _select(store_slug).ids_visible());

	const all_blocks_toggle_counter = useSelect(_select =>
		_select(store_slug).all_blocks_toggle_counter()
	);

	const is_detached = useSelect(_select => _select(store_slug).is_detached());

	const item_height = is_detached ? 39 : 52;

	const { $container, container_className, content_styles, items_styles } =
		useVirtualList({
			item_ids: ids_visible,
			item_height,
			number_of_items: ids_visible.length,
		});

	useScrollToSelectedBlock($container);

	const [top_visible_block_id, setTopVisibleBlockId] =
		useState<BlockId | null>(null);

	useLayoutEffect(() => {
		if (!$container.current || all_blocks_toggle_counter === 0) return;

		const scroll_top = $container.current.scrollTop;

		const top_visible_block = items_styles.find(
			({ top }) => top >= scroll_top
		);

		if (!top_visible_block) {
			setTopVisibleBlockId(null);
		} else {
			const { getBlockHierarchyRootClientId } =
				select("core/block-editor");

			const root_block_id = getBlockHierarchyRootClientId(
				top_visible_block.id
			);

			setTopVisibleBlockId(root_block_id);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [all_blocks_toggle_counter]);

	useLayoutEffect(() => {
		if (!ids_visible || !top_visible_block_id || !$container.current) {
			return;
		}

		setTopVisibleBlockId(null);

		const top_visible_block_index = ids_visible.findIndex(
			id => id === top_visible_block_id
		);

		if (top_visible_block_index === -1) return;

		$container.current.scrollTop = top_visible_block_index * item_height;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [top_visible_block_id]);

	return (
		<div ref={$container} className={container_className}>
			<div style={content_styles}>
				{items_styles.map(({ id, top }) => (
					<ContextProvider key={id} id={id}>
						<Block style={{ top }} />
					</ContextProvider>
				))}
			</div>
		</div>
	);
};
