import React from "react";
import { useSelect } from "@wordpress/data";
import { useContext } from "@wordpress/element";

import { useClassName } from "@/utils";
import { store_slug } from "@/store";

import styles from "./styles.styl";
import type { Component } from "./types";
import { useMovingAttributes, useMovingStyles, useSelectBlock } from "./utils";
import { context } from "./context";
import {
	BlockMenu,
	ContextProvider as BlockMenuContextProvider,
} from "../block-menu";
import { BlockToggleButton } from "../block-toggle-button";
import { BlockDropAreas } from "../block-drop-areas";
import { BlockContent } from "../block-content";

export const Block: Component = props => {
	const { style } = props;

	const { ancestors_id } = useContext(context);

	const moving_block = useSelect(select => select(store_slug).moving_block());
	const is_detached = useSelect(select => select(store_slug).is_detached());

	const { className: className_select, ...select_attributes } =
		useSelectBlock();

	const { can_move, moving_is_over, is_moving, ...moving_attributes } =
		useMovingAttributes();

	const {
		className_container: className_container_moving,
		className_content: className_content_moving,
	} = useMovingStyles({ can_move, moving_is_over, is_moving });

	const className_container = useClassName(
		[is_detached, ancestors_id, className_container_moving],
		{
			[styles.container]: true,
			[styles.is_detached]: is_detached,
			[styles[`level-${ancestors_id.length}`]]: true,
			[className_container_moving]: true,
		}
	);

	const className_content = useClassName(
		[moving_block, className_content_moving, className_select],
		{
			[styles.content]: true,
			[className_content_moving]: true,
			[className_select]: !moving_block,
		}
	);

	return (
		<div
			style={style}
			className={className_container}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...moving_attributes}
			// eslint-disable-next-line react/jsx-props-no-spreading
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
