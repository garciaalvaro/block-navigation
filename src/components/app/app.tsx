import React, { FunctionComponent } from "react";
import { useDispatch, useSelect } from "@wordpress/data";
import { useRef, useState, useEffect } from "@wordpress/element";

import styles from "./app.styl";
import styles_color from "@/styles/color.styl";
import { DetachedButtons } from "../detached-buttons";
import { Tabs } from "../tabs";
import { ViewNavigation } from "../view-navigation";
import { ViewSettings } from "../view-settings";
import { className, useWindowSize } from "@/utils";
import { store_slug } from "@/store";

export const App: FunctionComponent = () => {
	const view = useSelect(select => select(store_slug).getView());
	const { resetDetach } = useDispatch(store_slug);

	const [color_type, color_name] = useSelect(select =>
		select(store_slug).getColorScheme()
	).split("-");

	const moving_type = useSelect(select => select(store_slug).getMovingType());
	const { window_height, window_width } = useWindowSize();
	const $app = useRef<HTMLDivElement | null>(null);
	const [height, setHeight] = useState(0);
	const [width, setWidth] = useState(0);
	const is_mobile = window_width < 783;

	useEffect(() => {
		resetDetach();
	}, []);

	useEffect(() => {
		const $container = $app.current?.parentElement;
		const $container_parent = $container?.parentElement;

		if (!$container || !$container_parent) return;

		$container.style.flexGrow = "1";
		$container.style.maxHeight = "100%";
		$container_parent.style.display = "flex";
		$container_parent.style.flexDirection = "column";
		$container_parent.style.overflow = "visible";
		$container_parent.style.height = "100%";

		return () => {
			$container.style.flexGrow = "";
			$container.style.maxHeight = "";
			$container_parent.style.display = "";
			$container_parent.style.flexDirection = "";
			$container_parent.style.overflow = "";
			$container_parent.style.height = "";
		};
	}, []);

	useEffect(() => {
		const $container = $app.current?.parentElement;

		if (!$container) return;

		const width = $container.offsetWidth || 0;
		const height = $container.offsetHeight || 0;

		setWidth(width);
		setHeight(height);
	}, [window_height, window_width]);

	if (width === 0 || height === 0) {
		return <div ref={$app}></div>;
	}

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
					container_width={width}
					container_height={
						moving_type === "by_click" ? height - 55 : height
					}
				/>
			) : (
				<ViewSettings container_height={height} />
			)}

			{!is_mobile && <DetachedButtons />}
		</div>
	);
};
