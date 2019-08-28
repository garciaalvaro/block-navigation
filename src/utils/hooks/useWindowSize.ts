const { throttle } = lodash;
const { useState, useEffect } = wp.element;

// https://stackoverflow.com/a/28241682 | CC BY-SA 3.0
export const useWindowSize = (time = 300) => {
	const [width, setWidth] = useState(
		document.documentElement.clientWidth ||
			document.body.clientWidth ||
			window.innerWidth
	);

	const [height, setHeight] = useState(
		document.documentElement.clientHeight ||
			document.body.clientHeight ||
			window.innerHeight
	);

	const throttled = throttle(
		() => {
			setWidth(
				document.documentElement.clientWidth ||
					document.body.clientWidth ||
					window.innerWidth
			);
			setHeight(
				document.documentElement.clientHeight ||
					document.body.clientHeight ||
					window.innerHeight
			);
		},
		time,
		{
			leading: true,
			trailing: true
		}
	);

	useEffect(() => {
		window.addEventListener("resize", throttled);

		return () => {
			window.removeEventListener("resize", throttled);
			throttled.cancel();
		};
	}, []);

	return { window_width: width, window_height: height };
};
