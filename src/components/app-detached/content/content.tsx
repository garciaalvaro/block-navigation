import React from "react";
import type { FunctionComponent } from "react";
import { useSelect, useDispatch } from "@wordpress/data";
import { useState, useRef } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { ResizableBox } from "@wordpress/components";

import styles from "./content.styl";
import { useSizeMax } from "./utils";
import { useClassName, useColor } from "@/utils";
import { store_slug } from "@/store";
import { Navigation } from "@/components/Navigation";

export const Content: FunctionComponent = () => {
	const [is_dragging, setIsDragging] = useState(false);

	const { detachedSizeUpdate } = useDispatch(store_slug);
	const position = useSelect(select =>
		select(store_slug).detached_position()
	);
	const { width, height } = useSelect(select =>
		select(store_slug).detached_size()
	);
	const size = useRef({ width, height });
	const size_max = useSizeMax();

	const color_className = useColor();
	const className = useClassName(styles.container, ...color_className);

	return (
		<ResizableBox
			className={className}
			size={{ width, height }}
			minWidth="150"
			minHeight="200"
			maxWidth={size_max.width}
			maxHeight={size_max.height}
			enable={{
				topLeft: position === "right",
				topRight: position === "left",
			}}
			onResizeStart={() => {
				size.current = { width, height };
				setIsDragging(true);
			}}
			onResizeStop={() => setIsDragging(false)}
			onResize={(event, direction, $el, delta) =>
				detachedSizeUpdate({
					width: size.current.width + delta.width,
					height: size.current.height + delta.height,
				})
			}
		>
			{is_dragging ? (
				<div className={styles.warning}>
					<span>
						{__(
							"The block list will show after the resize finishes."
						)}
					</span>
				</div>
			) : (
				<Navigation />
			)}
		</ResizableBox>
	);
};
