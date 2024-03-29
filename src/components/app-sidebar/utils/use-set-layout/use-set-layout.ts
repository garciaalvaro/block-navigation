import { useRef, useLayoutEffect } from "@wordpress/element";

import type { Util } from "./types";

export const useSetLayout: Util = () => {
	const $container = useRef<HTMLDivElement | null>(null);

	useLayoutEffect(() => {
		const $container_parent = $container.current?.parentElement || null;
		const $container_grandparent = $container_parent?.parentElement || null;

		if (!$container_parent || !$container_grandparent) return;

		$container_parent.style.flexGrow = "1";
		$container_parent.style.maxHeight = "100%";
		$container_grandparent.style.display = "flex";
		$container_grandparent.style.flexDirection = "column";
		$container_grandparent.style.overflow = "visible";
		$container_grandparent.style.height = "100%";

		// eslint-disable-next-line consistent-return
		return () => {
			if (!$container_parent || !$container_grandparent) return;

			$container_parent.style.flexGrow = "";
			$container_parent.style.maxHeight = "";
			$container_grandparent.style.display = "";
			$container_grandparent.style.flexDirection = "";
			$container_grandparent.style.overflow = "";
			$container_grandparent.style.height = "";
		};
	}, []);

	return $container;
};
