import React, { FunctionComponent } from "react";
import { useSelect } from "@wordpress/data";
import { useRef, useState, useEffect, Fragment } from "@wordpress/element";

import styles from "./App.styl";
import { Tabs } from "../Tabs";
import { ViewNavigation } from "../ViewNavigation";
import { ViewSettings } from "../ViewSettings";
import { useWindowSize } from "@/utils/hooks";
import { className } from "@/utils/tools";
import { store_slug } from "@/utils/data";
import styles_color from "@/utils/css/color.styl";

export const App: FunctionComponent = () => {
	const view = useSelect(select => select(store_slug).getView());

	const [color_type, color_name] = useSelect(select =>
		select(store_slug).getColorScheme()
	).split("-");

	const moving_type = useSelect(select => select(store_slug).getMovingType());
	const { window_height, window_width } = useWindowSize();
	const $app = useRef<HTMLDivElement | null>(null);
	const [height, setHeight] = useState(0);
	const [width, setWidth] = useState(0);

	useEffect(() => {
		const $container = $app.current?.parentElement;
		const $container_parent = $container?.parentElement;

		if (!$container || !$container_parent) return;

		$container.style.flexGrow = "1";
		$container.style.maxHeight = "100%";
		$container_parent.style.display = "flex";
		$container_parent.style.flexDirection = "column";
		$container_parent.style.overflow = "visible";

		return () => {
			$container.style.flexGrow = "";
			$container.style.maxHeight = "";
			$container_parent.style.display = "";
			$container_parent.style.flexDirection = "";
			$container_parent.style.overflow = "";
		};
	}, []);

	useEffect(() => {
		const $container = $app.current?.parentElement;

		if (!$container) return;

		const width = $container.offsetWidth || 0;
		const height = $container.offsetHeight || 0;

		setHeight(height);
		setWidth(width);
	}, [window_height, window_width]);

	const width_height_is_ready = width > 0 && height > 0;

	return (
		<div
			ref={$app}
			className={className([
				styles.container,
				styles_color[color_type],
				styles_color[color_name],
			])}
		>
			{width_height_is_ready && (
				<Fragment>
					<Tabs />

					{view === "navigation" ? (
						<ViewNavigation
							container_height={
								moving_type === "by_click"
									? height - 55
									: height
							}
							container_width={width}
						/>
					) : (
						<ViewSettings />
					)}
				</Fragment>
			)}
		</div>
	);
};
