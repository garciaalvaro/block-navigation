import React, { FunctionComponent } from "react";
import { useSelect, useDispatch } from "@wordpress/data";
import { useEffect } from "@wordpress/element";

import styles from "./App.styl";
import styles_color from "@/utils/css/color.styl";
import { DetachedButtons } from "../DetachedButtons";
import { ViewNavigation } from "../ViewNavigation";
import { useWindowSize } from "@/utils/hooks";
import { className } from "@/utils/tools";
import { store_slug } from "@/utils/data";

export const AppDetached: FunctionComponent = () => {
	const { resetDetach } = useDispatch(store_slug);
	const is_expanded = useSelect(select =>
		select(store_slug).detachedIsExpanded()
	);

	const [color_type, color_name] = useSelect(select =>
		select(store_slug).getColorScheme()
	).split("-");

	const moving_type = useSelect(select => select(store_slug).getMovingType());
	const { window_height, window_width } = useWindowSize();
	const is_mobile = window_width < 783;
	const height = 300;
	const width = 240;

	useEffect(() => {
		if (is_mobile) {
			resetDetach();
		}
	}, [window_height, window_width]);

	return (
		<div
			className={className([
				styles.container,
				styles_color[color_type],
				styles_color[color_name],
				styles.is_detached,
				...(is_expanded ? [styles.is_expanded] : []),
			])}
		>
			{is_expanded && (
				<ViewNavigation
					container_width={width}
					container_height={
						moving_type === "by_click" ? height - 55 : height
					}
				/>
			)}

			<DetachedButtons />
		</div>
	);
};
