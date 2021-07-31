import React from "react";
import type { FunctionComponent } from "react";
import { useSelect } from "@wordpress/data";

import { store_slug } from "@/store";

import { useScrollToSelectedBlock, useVirtualList } from "./utils";
import { ContextProvider, Block } from "../block";

export const BlocksList: FunctionComponent = () => {
	const ids_visible = useSelect(select => select(store_slug).ids_visible());

	const is_detached = useSelect(select => select(store_slug).is_detached());

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
