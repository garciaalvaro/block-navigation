import { useState, useEffect, useRef } from "@wordpress/element";

import { useWindowSize } from "@/utils";

import type { Util } from "./types";

export const useContainerHeight: Util = () => {
	const $container = useRef<HTMLDivElement | null>(null);

	const { window_width, window_height } = useWindowSize();

	const [container_height, setContainerHeight] = useState(0);

	useEffect(() => {
		setContainerHeight($container.current?.clientHeight || 0);
	}, [window_width, window_height]);

	return { $container, container_height };
};
