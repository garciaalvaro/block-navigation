import type { RefObject } from "react";

export type Util = () => {
	$container: RefObject<HTMLDivElement>;
	container_height: number;
};
