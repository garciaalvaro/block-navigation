import React, { FunctionComponent } from "react";
import { useSelect, useDispatch } from "@wordpress/data";
import { useEffect, useState, useRef } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { ResizableBox } from "@wordpress/components";

import styles from "./app.styl";
import styles_color from "@/utils/css/color.styl";
import { DetachedButtons } from "../detached-buttons";
import { ViewNavigation } from "../view-navigation";
import { useWindowSize } from "@/utils/hooks";
import { className } from "@/utils/tools";
import { store_slug } from "@/utils/data";

export const AppDetached: FunctionComponent = () => {
	const { resetDetach, setDetachedSize } = useDispatch(store_slug);

	const detached_size = useSelect(select =>
		select(store_slug).getDetachedSize()
	);

	const detached_size_ref = useRef(detached_size);

	const detached_position = useSelect(select =>
		select(store_slug).getDetachedPosition()
	);

	const is_expanded = useSelect(select =>
		select(store_slug).detachedIsExpanded()
	);

	const [color_type, color_name] = useSelect(select =>
		select(store_slug).getColorScheme()
	).split("-");

	const [is_dragging, setIsDragging] = useState(false);
	const moving_type = useSelect(select => select(store_slug).getMovingType());
	const { window_height, window_width } = useWindowSize();
	const is_mobile = window_width < 783;

	const detached_max_size = {
		width: window_width - 50,
		height: window_height - 100,
	};

	useEffect(() => {
		if (is_mobile) {
			resetDetach();
		}

		if (
			detached_size.width > detached_max_size.width ||
			detached_size.height > detached_max_size.height
		) {
			const width = Math.min(
				detached_size.width,
				detached_max_size.width
			);

			const height = Math.min(
				detached_size.height,
				detached_max_size.height
			);

			setDetachedSize({ width, height });
		}
	}, [window_height, window_width]);

	return (
		<div
			className={className([
				styles.detached_container,
				styles[detached_position],
			])}
		>
			{is_expanded && (
				<ResizableBox
					className={className([
						styles.container,
						styles.is_detached,
						styles_color[color_type],
						styles_color[color_name],
					])}
					size={{
						width: detached_size.width,
						height: detached_size.height,
					}}
					minHeight="200"
					minWidth="150"
					maxHeight={detached_max_size.height}
					maxWidth={detached_max_size.width}
					enable={{
						topLeft: detached_position === "right",
						topRight: detached_position === "left",
					}}
					onResizeStart={() => {
						detached_size_ref.current = detached_size;
						setIsDragging(true);
					}}
					onResizeStop={() => setIsDragging(false)}
					onResize={(event, direction, $el, delta) =>
						setDetachedSize({
							width:
								detached_size_ref.current.width + delta.width,
							height:
								detached_size_ref.current.height + delta.height,
						})
					}
				>
					{is_dragging ? (
						<div className={styles.resize_content}>
							<span>
								{__(
									"The block list will show after the resize finishes."
								)}
							</span>
						</div>
					) : (
						<ViewNavigation
							container_width={detached_size.width}
							container_height={
								moving_type === "by_click"
									? detached_size.height - 55
									: detached_size.height
							}
						/>
					)}
				</ResizableBox>
			)}

			<DetachedButtons />
		</div>
	);
};
