import type { MutableRefObject } from "react";
import "@wordpress/compose";

declare module "@wordpress/compose" {
	function useCopyOnClick(
		$element: MutableRefObject<HTMLElement | null>,
		text: string
	): void;
}
