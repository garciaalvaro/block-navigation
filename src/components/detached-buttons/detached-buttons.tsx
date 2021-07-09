import React, { FunctionComponent } from "react";
import { useSelect, useDispatch } from "@wordpress/data";
import { __ } from "@wordpress/i18n";

import styles from "./detached-buttons.styl";
import styles_color from "@/utils/css/color.styl";
import { Button } from "@/utils/components";
import { className } from "@/utils/tools";
import { store_slug } from "@/utils/data";

export const DetachedButtons: FunctionComponent = () => {
	const is_detached = useSelect(select => select(store_slug).isDetached());

	const is_expanded = useSelect(select =>
		select(store_slug).detachedIsExpanded()
	);

	const detached_position = useSelect(select =>
		select(store_slug).getDetachedPosition()
	);

	const [color_type, color_name] = useSelect(select =>
		select(store_slug).getColorScheme()
	).split("-");

	const {
		detach,
		resetDetach,
		resetDetachedSize,
		expandDetached,
		collapseDetached,
	} = useDispatch(store_slug);

	const { openGeneralSidebar } = useDispatch("core/edit-post");

	const close = () => {
		if (is_detached) {
			resetDetach();
			// If the user clicks the close button,
			// reset the size of the detached list.
			resetDetachedSize();
		} else {
			detach();
			openGeneralSidebar("edit-post/block");
		}
	};

	const toggle = is_expanded ? collapseDetached : expandDetached;

	return (
		<div
			className={className([
				styles.container,
				...(is_detached ? [styles[detached_position]] : []),
				styles_color[color_type],
				styles_color[color_name],
			])}
		>
			<Button
				className={styles.button}
				onClick={close}
				icon={is_detached ? "close" : "detach"}
			>
				<span>{is_detached ? __("Close") : __("Detach")}</span>
			</Button>

			{is_detached && (
				<Button
					className={styles.button}
					onClick={toggle}
					icon={is_expanded ? "expand" : "collapse"}
				>
					<span>{is_expanded ? __("Collapse") : __("Expand")}</span>
				</Button>
			)}
		</div>
	);
};
