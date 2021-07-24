import React from "react";
import type { FunctionComponent, MouseEventHandler } from "react";
import { useContext } from "@wordpress/element";
import { useDispatch, useSelect } from "@wordpress/data";

import { useButton } from "@/utils";
import { store_slug } from "@/store";
import { context } from "../block";
import { Icon } from "../icon";

export const BlockToggleButton: FunctionComponent = () => {
	const { id } = useContext(context);

	const has_children = useSelect(
		select => select("core/block-editor").getBlockOrder(id).length > 0
	);

	const is_expanded = useSelect(select => select(store_slug).is_expanded(id));

	const { toggleBlock } = useDispatch(store_slug);

	const button_props = useButton("icon");

	const onClick: MouseEventHandler = e => {
		e.stopPropagation();

		toggleBlock(id);
	};

	if (!has_children) {
		return null;
	}

	return (
		<button
			className={button_props.className}
			onClick={onClick}
			{...button_props.attributes}
		>
			<Icon icon={is_expanded ? "collapse" : "expand"} />
		</button>
	);
};
