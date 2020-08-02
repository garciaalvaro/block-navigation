import React, { FunctionComponent } from "react";
import { useSelect } from "@wordpress/data";
import { useRef, useState, useEffect } from "@wordpress/element";

import styles from "./App.styl";
import { Tabs } from "../Tabs";
import { ViewNavigation } from "../ViewNavigation";
import { ViewSettings } from "../ViewSettings";
import { className } from "@/utils/tools";
import { useWindowSize } from "@/utils/hooks";
import { store_slug } from "@/utils/data";
import styles_color from "@/utils/css/color.styl";

export const App: FunctionComponent = () => {
	const view = useSelect(select => select(store_slug).getView());

	const [color_type, color_name] = useSelect(select =>
		select(store_slug).getColorScheme()
	).split("-");

	const moving_type = useSelect(select => select(store_slug).getMovingType());

	const $app = useRef<HTMLDivElement | null>(null);
	const { window_height, window_width } = useWindowSize();
	const [height, setHeight] = useState(555);
	const [width, setWidth] = useState(555);

	useEffect(() => {
		if (!$app.current) return;

		const $app_container = $app.current;

		const $container = $app_container.closest<HTMLDivElement>(
			".edit-post-sidebar"
		);

		const $components_panel = $app_container.closest<HTMLDivElement>(
			".components-panel"
		);

		if (!$container || !$components_panel) return;

		$container.classList.add(styles.calculating_size);
		$components_panel.classList.add(styles.calculating_size);

		setHeight($components_panel.offsetHeight - 2);
		setWidth($components_panel.offsetWidth);

		$container.classList.remove(styles.calculating_size);
		$app_container.classList.remove(styles.calculating_size);
	}, [window_height, window_width]);

	return (
		<div
			ref={$app}
			className={className([
				styles.container,
				styles_color[color_type],
				styles_color[color_name],
			])}
		>
			<Tabs />

			{view === "navigation" ? (
				<ViewNavigation
					container_height={
						moving_type === "by_click" ? height - 55 : height
					}
					container_width={width}
				/>
			) : (
				<ViewSettings container_height={height} />
			)}
		</div>
	);
};
