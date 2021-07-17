import React from "react";
import type { FunctionComponent } from "react";
import { useMemo } from "@wordpress/element";
import { useSelect } from "@wordpress/data";

import { scrollToSelectedBlock, useVirtualList } from "./utils";
import { store_slug } from "@/store";
import { BlockContextProvider, Block } from "../block";

export const BlocksList: FunctionComponent = () => {
	const ids_visible = useSelect(select => select(store_slug).ids_visible());

	const moving_block = useSelect(select => select(store_slug).moving_block());

	const items_index_to_keep_rendered = useMemo<number[]>(() => {
		if (!moving_block || !ids_visible) return [];

		const index = ids_visible.findIndex(id => id === moving_block.id);

		return index === -1 ? [] : [index];
		// TODO: Confirm the dependencies array
	}, [moving_block]);

	const {
		$container,
		container_className,
		content_className,
		content_style,
		items_style,
	} = useVirtualList({
		items_index_to_keep_rendered,
		item_height: 52,
		items_length: ids_visible.length,
	});

	scrollToSelectedBlock($container);

	return (
		<div ref={$container} className={container_className}>
			<div className={content_className} style={content_style}>
				{items_style.map((style, index) => (
					<BlockContextProvider id={ids_visible[index]}>
						<Block style={style} />
					</BlockContextProvider>
				))}
			</div>
		</div>
	);
};
