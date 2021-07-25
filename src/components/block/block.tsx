import React from "react";
import { useSelect } from "@wordpress/data";
import { useContext } from "@wordpress/element";

import styles from "./styles.styl";
import type { Component } from "./types";
import { useMovingAttributes, useMovingClasses, useSelectBlock } from "./utils";
import { context } from "./context";
import { useClassName } from "@/utils";
import {
	BlockMenu,
	ContextProvider as BlockMenuContextProvider,
} from "../block-menu";
import { BlockToggleButton } from "../block-toggle-button";
import { BlockDropAreas } from "../block-drop-areas";
import { BlockContent } from "../block-content";
import { store_slug } from "@/store";

export const Block: Component = props => {
	const { style } = props;

	const { id, ancestors_id } = useContext(context);

	const moving_block = useSelect(select => select(store_slug).moving_block());

	const { className: className_select, ...select_attributes } =
		useSelectBlock();

	const { can_move, moving_is_over, is_moving, ...moving_attributes } =
		useMovingAttributes();

	const {
		className_container: className_container_moving,
		className_content: className_content_moving,
	} = useMovingClasses({ can_move, moving_is_over, is_moving });

	const className_container = useClassName(
		styles.container,
		styles[`level-${ancestors_id.length}`],
		className_container_moving
	);

	const className_content = useClassName({
		[styles.content]: true,
		[className_content_moving]: true,
		[className_select]: !moving_block,
	});

	return (
		<div
			style={style}
			className={className_container}
			{...moving_attributes}
			{...select_attributes}
		>
			<BlockDropAreas />

			<div className={className_content}>
				<BlockContent />

				<BlockToggleButton />

				<BlockMenuContextProvider>
					<BlockMenu />
				</BlockMenuContextProvider>
			</div>
		</div>
	);
};
