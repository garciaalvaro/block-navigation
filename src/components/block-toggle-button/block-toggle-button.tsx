import React from "react";
import type { FunctionComponent, MouseEventHandler } from "react";
import { useContext } from "@wordpress/element";
import { useDispatch, useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";

import { Button } from "@/utils";
import { store_slug } from "@/store";

import styles from "./styles.styl";
import { context } from "../block";
import { Icon } from "../icon";

export const BlockToggleButton: FunctionComponent = () => {
	const { id } = useContext(context);

	const has_children = useSelect(
		select => select("core/block-editor").getBlockOrder(id).length > 0,
		[id]
	);

	const is_expanded = useSelect(
		select => select(store_slug).is_expanded(id),
		[id]
	);

	const { toggleBlock } = useDispatch(store_slug);

	const onClick: MouseEventHandler = e => {
		e.stopPropagation();

		toggleBlock(id);
	};

	if (!has_children) {
		return null;
	}

	return (
		<div className={styles.container}>
			<Button
				title={is_expanded ? __("Collapse") : __("Expand")}
				button_type="icon"
				onClick={onClick}
			>
				<Icon icon={is_expanded ? "collapse" : "expand"} />
			</Button>
		</div>
	);
};
