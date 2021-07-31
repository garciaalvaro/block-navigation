import { throttle } from "lodash";
import { useState, useEffect } from "@wordpress/element";

import type { Util } from "./types";

export const useWindowSize: Util = (time = 300) => {
	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);

	const [is_mobile, setIsMobile] = useState(width < 783);

	useEffect(() => {
		const throttled = throttle(
			() => {
				setWidth(window.innerWidth);
				setHeight(window.innerHeight);
			},
			time,
			{
				leading: true,
				trailing: true,
			}
		);

		window.addEventListener("resize", throttled);

		return () => {
			window.removeEventListener("resize", throttled);
			throttled.cancel();
		};
	}, [time]);

	useEffect(() => {
		setIsMobile(width < 783);
	}, [width]);

	return { window_width: width, window_height: height, is_mobile };
};
