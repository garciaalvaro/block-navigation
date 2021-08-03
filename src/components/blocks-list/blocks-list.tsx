import React from "react";
import type { FunctionComponent } from "react";
import { useEffect, useLayoutEffect, useState } from "@wordpress/element";
import { useSelect, select } from "@wordpress/data";

import { store_slug } from "@/store";
import type { BlockId } from "@/types";

import { useScrollToSelectedBlock, useVirtualList } from "./utils";
import { ContextProvider, Block } from "../block";

export const BlocksList: FunctionComponent = () => {
	const ids_visible = useSelect(_select => _select(store_slug).ids_visible());
	const ids_collapsed = useSelect(_select =>
		_select(store_slug).ids_collapsed()
	);
	const ids_root_collapsible = useSelect(_select =>
		_select(store_slug).ids_root_collapsible()
	);

	const is_detached = useSelect(_select => _select(store_slug).is_detached());

	const {
		$container,
		container_className,
		content_styles,
		items_styles,
		items_visible,
	} = useVirtualList({
		item_height: is_detached ? 39 : 52,
		number_of_items: ids_visible.length,
	});

	useScrollToSelectedBlock($container);

	const [top_visible_block_id, setTopVisibleBlockId] =
		useState<BlockId | null>(null);

	useEffect(() => {
		if (
			(`${ids_collapsed}` !== `${ids_root_collapsible}` &&
				ids_collapsed.length > 0) ||
			ids_visible.length === 0 ||
			!$container.current
		) {
			return;
		}

		const scroll_top = $container.current.scrollTop;

		const top_visible_block_index = items_visible.find(
			index => items_styles[index].top >= scroll_top
		);

		if (
			top_visible_block_index === undefined ||
			!ids_visible[top_visible_block_index]
		) {
			setTopVisibleBlockId(null);
		} else {
			const root_block_id = select(
				"core/block-editor"
			).getBlockHierarchyRootClientId(
				ids_visible[top_visible_block_index]
			);

			setTopVisibleBlockId(root_block_id);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ids_collapsed]);

	useLayoutEffect(() => {
		if (
			!ids_visible ||
			top_visible_block_id === null ||
			!$container.current
		) {
			return;
		}

		setTopVisibleBlockId(null);

		const top_visible_block_index = ids_visible?.findIndex(
			id => id === top_visible_block_id
		);

		$container.current.scrollTop =
			items_styles[top_visible_block_index].top;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [top_visible_block_id]);

	return (
		<div ref={$container} className={container_className}>
			<div style={content_styles}>
				{items_visible.map(index => (
					<ContextProvider key={index} id={ids_visible[index]}>
						<Block style={items_styles[index]} />
					</ContextProvider>
				))}
			</div>
		</div>
	);
};